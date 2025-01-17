import React from 'react';
//import PaypalExpressBtn from 'react-paypal-express-checkout';

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

/* ----------------------------------------------------------------------------------------
 react-paypal-express-checkout  - npm package, Full Example documentation, crea un boton ya configurado,
  -hay que cambiar el sandbox a la de tu aplicacion creada en tu cuenta de paypal.developer
  -cambair el "currency" a la moneda destino
  -cambiar "total" con el valor total de la compra (se pasa en los props como argumento)
  ----------------------------------------------------------------------------------------*/

/*export default class PaypalButton extends React.Component {
    render() {
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            		console.log("The payment was succeeded!", payment);
            		// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
                    this.props.tranSuccess(payment)
        }
 
        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }
 
        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        }
 
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'MXN'; // or you can set this value from your props or state
        let total = this.props.total; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
 
        const client = {
            sandbox:    'AS_RCgiLjYx6rfs1GdT4hEoMflavbhE4kO5wCgMkprh-2trq7DJL7IfECtZQkOnolgXQ8y6syfFpCFd0',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/
 
        // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
        // let style = {
        //     size: 'smal',
        //     color: 'blue',
        //     shape: 'rect',
        //     label: 'checkout',
        //     tagline: false
        // }

        return (
            <PaypalExpressBtn 
                env={env} 
                client={client} 
                currency={currency} 
                total={total} 
                onError={onError} 
                onSuccess={onSuccess} 
                onCancel={onCancel} 
                // style={style}
            />
        );
    }
}*/



export default class PaypalButton extends React.Component {
    render() {
        const initialOptions = {
            "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID || 'AS_RCgiLjYx6rfs1GdT4hEoMflavbhE4kO5wCgMkprh-2trq7DJL7IfECtZQkOnolgXQ8y6syfFpCFd0',
            currency: 'MXN',
            intent: 'capture',
        };

        const createOrder = (data, actions) => {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: this.props.total,
                    },
                }],
            });
        };

        const onApprove = (data, actions) => {
            return actions.order.capture().then((details) => {
                console.log("The payment was succeeded!", details);
                this.props.tranSuccess(details);
            });
        };

        const onCancel = (data) => {
            console.log('The payment was cancelled!', data);
        };

        const onError = (err) => {
            console.log("Error!", err);
        };

        return (
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onCancel={onCancel}
                    onError={onError}
                />
            </PayPalScriptProvider>
        );
    }
}