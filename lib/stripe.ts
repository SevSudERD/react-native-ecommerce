import Stripe from "stripe";

const stripe = new Stripe('sk_test_51QTFd6CZ5UFBrTLkts557YVQNOUQShGmtrbKwEZ2ByGlqpDhrYJMfYQhOONHfhxVF6mBqkUSuLctifTLyn37AAHa00IM9zDiN4', {
     apiVersion: "2024-11-20.acacia",
});

export default stripe;