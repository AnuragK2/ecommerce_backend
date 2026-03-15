const razorpay=require("../config/razorpayClient.js");
const orderService=require("../services/order.service.js")

const createPaymentLink = async (orderId) => {
    try {
        const order=await orderService.findOrderById(orderId);
        if (!order) {
            throw new Error(`Order not found for id ${orderId}`);
        }

        // const callbackBaseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
        const callbackBaseUrl = process.env.FRONTEND_URL;

        const paymentLinkRequest={
            amount:order.totalPrice*100,
            currency: "INR",
            customer: {
                name:order.user.firstName +" "+order.user.lastName,
                contact :order.user.mobile,
                email: order.user.email,
            },
            notify:{
                sms:true,
                email:true
            },
            reminder_enable: true,
            callback_url:`${callbackBaseUrl}/payment/${orderId}`,
            callback_method:'get'
        };

        const paymentLink=await razorpay.paymentLink.create(paymentLinkRequest);
        
        const paymentLinkId=paymentLink.id;
        const payment_link_url=paymentLink.short_url;

        const resData={
            paymentLinkId,
            payment_link_url
        }

        return resData;

    } catch (error) {
        console.error('Error creating payment link:', error);
        throw error;
    }
};


const updatePaymentInformation= async(resData)=>{
    const paymentId=resData.payment_id;
    const orderId=resData.order_id;

    try {
        const order=await orderService.findOrderById(orderId);
        const payment= await razorpay.payments.fetch(paymentId);

        if(payment.status=="captured"){
            order.paymentDetails.paymentId=paymentId;
            order.paymentDetails.status="COMPLETED",
            order.orderStatus="PLACED";

            await order.save();
        }

        const resData={message:"Your order is placed", success:true}

        return resData;
        
    }catch(error){
        console.error(error.message);
        throw error;
    }
}

module.exports = {
    createPaymentLink,
    updatePaymentInformation
};
