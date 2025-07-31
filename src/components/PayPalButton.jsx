// src/components/PayPalButton.jsx
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { db } from '../firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 


const CLIENT_ID = "AbeNVaWdv3WdmLOWFdI4XBRi44dqrxirnHrSvP9FUzT8B-c2IwxUgxT7ciqBdCTs7P-0Px0kREgM_T9q"; 

// 3. Aceptamos la nueva prop 'donationData'
const PayPalButton = ({ currency, amount, onSuccess, donationData }) => {
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
          // Esta función se ejecuta cuando el pago es aprobado por el usuario
          const order = await actions.order.capture();
          console.log("¡Pago exitoso!", order);
         
          // 4. GUARDAMOS LOS DATOS DE LA DONACIÓN EN FIRESTORE
          try {
            // 'donations' es el nombre de la colección que crearemos en Firestore
            await addDoc(collection(db, "donations"), {
              // Usamos los datos que recibimos de donationData
              name: donationData.name,
              message: donationData.message,
              amount: donationData.amount,
              currency: currency,
              timestamp: serverTimestamp(), // Guarda la fecha y hora del servidor
            });
            console.log("¡Donación guardada en la base de datos!");
          } catch (error) {
            console.error("Error al guardar la donación en Firestore: ", error);
            // Aunque falle el guardado en DB, el usuario ya pagó. 
            // Podríamos implementar un sistema de reintento o notificación aquí.
          }

          // 5. LLAMAMOS A onSuccess para mostrar el confeti y el mensaje de éxito
          if (onSuccess) {
            onSuccess();
          }
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
