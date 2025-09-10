import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axiosClient from '../pages/api/axios-client';

const stripePromise = loadStripe('pk_test_51RlbF0Q7Tl8g7sbZqHiAMygkKJ2KbaxH0vyV2VfLyInXaMwt37CEhEkQHcoJLXAXBRADqCVXukkDpeX7UAvum4np00bdlgrJYP');


const CheckoutForm = ({ courseData, onSuccess, onCancel }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const formatPrice = (price) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        if (!stripe || !elements) return;

        try {
            // 1. Create payment intent from backend
            const response = await axiosClient.post('/create-payment-intent', {
                course_id: courseData.idCours,
            });

            const { clientSecret } = response.data;

            // 2. Confirm payment on frontend
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: { name: "Test User" },
                },
            });

            if (error) throw error;

            // 3. Notify backend of success
            await axiosClient.post('/payment-success', {
                course_id: courseData.idCours,
                amount: courseData.prix,
                payment_intent: paymentIntent.id,
            });

            onSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': { color: '#aab7c4' },
                        },
                        invalid: { color: '#9e2146' },
                    },
                }}
            />

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            <div className="d-flex justify-content-between mt-4">
                <button type="button" onClick={onCancel} className="btn btn-secondary">
                    Cancel
                </button>
                <button type="submit" disabled={!stripe || loading} className="btn btn-primary">
                    {loading ? 'Processing...' : `Pay ${formatPrice(courseData.prix)}`}
                </button>
            </div>
        </form>
    );
};

const Payement = ({ courseData, onSuccess, onCancel, show }) => {
    return (
        <Modal show={show} onHide={onCancel} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Complete Your Purchase</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-4 p-3 bg-light rounded">
                    <div className="d-flex align-items-center">
                        <img
                            src={`/${courseData.image}`}
                            alt={courseData.titre}
                            className="rounded me-3"
                            style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                        />
                        <div className="flex-grow-1">
                            <h6 className="mb-1">{courseData.titre}</h6>
                            <p className="text-muted mb-1">by {courseData.enseignant}</p>
                        </div>
                        <div className="text-end">
                            <h4 className="mb-0 text-primary">
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }).format(courseData.prix)}
                            </h4>
                        </div>
                    </div>
                </div>

                <Elements stripe={stripePromise}>
                    <CheckoutForm courseData={courseData} onSuccess={onSuccess} onCancel={onCancel} />
                </Elements>
            </Modal.Body>
        </Modal>
    );
};

export default Payement;