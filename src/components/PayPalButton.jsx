// src/components/PayPalButton.jsx
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const CLIENT_ID = "AbeNVaWdv3WdmLOWFdI4XBRi44dqrxirnHrSvP9FUzT8B-c2IwxUgxT7ciqBdCTs7P-0Px0kREgM_T9q"; 

const PayPalButton = ({ currency, amount, onSuccess }) => {
  if (!CLIENT_ID){
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
         if (onSuccess) {
            onSuccess();
          }
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
