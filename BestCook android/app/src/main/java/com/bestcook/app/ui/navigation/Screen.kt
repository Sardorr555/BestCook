package com.bestcook.app.ui.navigation

sealed class Screen(val route: String, val title: String) {
    object Home : Screen("home", "Asosiy")
    object CakeConstructor : Screen("cake_constructor", "Tort 3D")
    object FastFoodConstructor : Screen("fastfood_constructor", "Burger 2D")
    object Sellers : Screen("sellers", "Oshpazlar")
    object Cart : Screen("cart", "Savat")
    object Profile : Screen("profile", "Profil")
    object Checkout : Screen("checkout", "Buyurtma")
    object OrderSuccess : Screen("order_success", "Buyurtma Qabul Qilindi")
}
