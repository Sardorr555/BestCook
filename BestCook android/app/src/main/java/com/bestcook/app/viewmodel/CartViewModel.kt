package com.bestcook.app.viewmodel

import androidx.lifecycle.ViewModel
import com.bestcook.app.model.CartItem
import com.bestcook.app.model.Order
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class CartViewModel : ViewModel() {
    private val _cartItems = MutableStateFlow<List<CartItem>>(emptyList())
    val cartItems: StateFlow<List<CartItem>> = _cartItems.asStateFlow()

    private val _orders = MutableStateFlow<List<Order>>(emptyList())
    val orders: StateFlow<List<Order>> = _orders.asStateFlow()

    fun addToCart(item: CartItem) {
        val currentList = _cartItems.value.toMutableList()
        // Check if item with same ID (or same details/specifications) already exists
        val existingIndex = currentList.indexOfFirst { it.name == item.name && it.details == item.details }
        if (existingIndex != -1) {
            val existingItem = currentList[existingIndex]
            currentList[existingIndex] = existingItem.copy(quantity = existingItem.quantity + item.quantity)
        } else {
            currentList.add(item)
        }
        _cartItems.value = currentList
    }

    fun updateQuantity(itemId: String, newQuantity: Int) {
        if (newQuantity <= 0) {
            removeFromCart(itemId)
            return
        }
        _cartItems.value = _cartItems.value.map {
            if (it.id == itemId) it.copy(quantity = newQuantity) else it
        }
    }

    fun removeFromCart(itemId: String) {
        _cartItems.value = _cartItems.value.filter { it.id != itemId }
    }

    fun clearCart() {
        _cartItems.value = emptyList()
    }

    fun getCartTotal(): Int {
        return _cartItems.value.sumOf { it.price * it.quantity }
    }

    fun placeOrder(customerName: String, phone: String, address: String): Order? {
        if (_cartItems.value.isEmpty()) return null

        val newOrder = Order(
            id = "order_" + System.currentTimeMillis(),
            items = _cartItems.value,
            totalPrice = getCartTotal(),
            customerName = customerName,
            phone = phone,
            address = address,
            status = "Kutilmoqda",
            timestamp = System.currentTimeMillis()
        )

        _orders.value = listOf(newOrder) + _orders.value
        clearCart()
        return newOrder
    }
}
