// src/components/PayPalButton.jsx
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// --- ¡MUY IMPORTANTE! ---
// 1. Obtén tu Client ID desde tu PayPal Developer Dashboard.
// 2. NUNCA subas esta clave directamente a GitHub. Guárdala en un archivo .env.local
//    y léela con `import.meta.env.VITE_PAYPAL_CLIENT_ID`
// Por ahora, para probar, la pondremos aquí.
const CLIENT_ID = "ASrsyhLfqYQJrdzZEePaD-cl9QkZXARDUQrIlJC6OQGz61vdhk_wN_T8nIs8Anh8QF2alOiWPwsDy9FjI"; 

const PayPalButton = ({ currency, amount }) => {
  if (!CLIENT_ID || CLIENT_ID === "ASrsyhLfqYQJrdzZEePaD-cl9QkZXARDUQrIlJC6OQGz61vdhk_wN_T8nIs8Anh8QF2alOiWPwsDy9FjI") {
    return <div className="text-center text-red-500 font-bold p-4 bg-red-100 rounded-lg">Error: La clave de cliente de PayPal no está configurada.</div>;
  }

  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID, currency: currency, intent: "capture" }}>
      <PayPalButtons
        style={{ layout: "vertical", color: "blue", shape: "pill", label: "pay" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "Donación a la Fundación Sonrisas Inocentes",
                amount: {
                  currency_code: currency,
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          console.log("¡Pago exitoso!", order);
          alert(`¡Gracias por tu donación de ${amount} ${currency}! Tu apoyo transforma vidas.`);
          // Opcional: podrías llamar a una función para cerrar el modal aquí
        }}
        onError={(err) => {
          console.error("Error en el pago de PayPal:", err);
          alert("Ocurrió un error con tu donación. Por favor, inténtalo de nuevo.");
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
