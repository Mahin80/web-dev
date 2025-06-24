
const { Order } = require('../models');
const { OrderItem } = require('../models');
const { Product } = require('../models');



exports.createOrder = async (req, res) => {
    const { items, userId = null, paymentMethod, ...shippingInfo } = req.body;


    try {
        // Step 1: Calculate total from product prices
        let total = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findByPk(item.id);
            if (!product) return res.status(404).json({ message: `Product ID ${item.id} not found` });

            const itemTotal = product.price * item.quantity;
            total += itemTotal;

            orderItems.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.price,
                name: product.name   // add this
            });


        }

        // Step 2: Determine shipping cost
        let shipping = 0;
        if (total <= 100 && paymentMethod === 'cash') {
            shipping = 20;
        }

        const subtotal = total + shipping;

        // Step 3: Create Order
        const newOrder = await Order.create({
            userId, // can be null for guests
            paymentMethod,
            total,
            shipping,
            subtotal,
            ...shippingInfo
        });


        // Step 4: Create OrderItems
        for (const item of orderItems) {
            await OrderItem.create({
                orderId: newOrder.id,
                ...item
            });
        }

        res.status(201).json({ message: 'Order placed successfully', orderId: newOrder.id });
    } catch (err) {
        console.error("Order Creation Error:", err);
        res.status(500).json({ message: 'Error placing order', error: err.message });
    }
};


exports.getOrdersByUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const orders = await Order.findAll({ where: { userId } });
        res.json(orders);
    } catch (err) {
        res.status(500).json({
            message: 'Failed to fetch orders',
            error: err.message
        });
    }
};
