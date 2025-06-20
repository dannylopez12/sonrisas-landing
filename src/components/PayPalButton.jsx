// src/components/PayPalButton.jsx
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ currency, amount }) => {
  // Pega aquí tu Client ID de SANDBOX que copiaste en el Paso 1
  const CLIENT_ID = "ASrsyhLfqYQJrdzZEePaD-cl9QkZXARDUQrIlJC6OQGz61vdhk_wN_T8nIs8Anh8QF2alOiWPwsDy9Fj"; 

  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID, currency: currency }}>
      <PayPalButtons
        style={{ layout: "vertical", color: "blue", shape: "pill", label: "paypal" }}
        createOrder={(data, actions) => {
          // Define los detalles de la transacción
          return actions.order.create({
            purchase_units: [
              {
                description: "Donación a la Fundación Sonrisas Inocentes",
                amount: {
                  currency_code: currency,
                  value: amount, // El monto que se pasará como prop
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          // Esta función se ejecuta cuando el pago es exitoso
          const order = await actions.order.capture();
          console.log("¡Pago exitoso!", order);
          // Muestra un mensaje de agradecimiento
          alert(`¡Gracias por tu donación de ${amount} ${currency}! Tu apoyo es muy valioso.`);
          // Aquí podrías redirigir al usuario a una página de "gracias"
        }}
        onError={(err) => {
          // Esta función se ejecuta si hay un error
          console.error("Error en el pago de PayPal:", err);
          alert("Ocurrió un error con tu donación. Por favor, inténtalo de nuevo.");
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;