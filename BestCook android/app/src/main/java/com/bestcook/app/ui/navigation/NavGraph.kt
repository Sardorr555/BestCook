package com.bestcook.app.ui.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.bestcook.app.ui.screens.*
import com.bestcook.app.viewmodel.CartViewModel

@Composable
fun MainScreenContainer(
    cartViewModel: CartViewModel
) {
    val navController = rememberNavController()

    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    val bottomBarScreens = listOf(
        Screen.Home,
        Screen.Sellers,
        Screen.Cart,
        Screen.Profile
    )

    // Hide bottom bar on constructor screens, checkout, and order success
    val showBottomBar = currentRoute in bottomBarScreens.map { it.route }

    Scaffold(
        bottomBar = {
            if (showBottomBar) {
                NavigationBar(
                    containerColor = MaterialTheme.colorScheme.surface,
                    tonalElevation = 8.dp
                ) {
                    bottomBarScreens.forEach { screen ->
                        val isSelected = currentRoute == screen.route
                        val icon = when (screen) {
                            is Screen.Home -> Icons.Default.Home
                            is Screen.Sellers -> Icons.Default.Star
                            is Screen.Cart -> Icons.Default.ShoppingCart
                            is Screen.Profile -> Icons.Default.Person
                            else -> Icons.Default.Home
                        }

                        NavigationBarItem(
                            selected = isSelected,
                            onClick = {
                                navController.navigate(screen.route) {
                                    popUpTo(navController.graph.findStartDestination().id) {
                                        saveState = true
                                    }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            },
                            label = { Text(screen.title) },
                            icon = { Icon(imageVector = icon, contentDescription = screen.title) },
                            colors = NavigationBarItemDefaults.colors(
                                selectedIconColor = MaterialTheme.colorScheme.primary,
                                selectedTextColor = MaterialTheme.colorScheme.primary,
                                indicatorColor = MaterialTheme.colorScheme.primaryContainer
                            )
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.Home.route,
            modifier = Modifier.padding(innerPadding)
        ) {
            composable(Screen.Home.route) {
                HomeScreen(
                    navController = navController,
                    onProductSelected = { product ->
                        if (product.categoryId == "cakes") {
                            navController.navigate(Screen.CakeConstructor.route)
                        } else if (product.categoryId == "fastfood") {
                            navController.navigate(Screen.FastFoodConstructor.route)
                        } else {
                            navController.navigate(Screen.Cart.route)
                        }
                    }
                )
            }
            composable(Screen.CakeConstructor.route) {
                CakeConstructorScreen(
                    navController = navController,
                    cartViewModel = cartViewModel
                )
            }
            composable(Screen.FastFoodConstructor.route) {
                FastFoodConstructorScreen(
                    navController = navController,
                    cartViewModel = cartViewModel
                )
            }
            composable(Screen.Sellers.route) {
                SellersScreen(navController = navController)
            }
            composable(Screen.Cart.route) {
                CartScreen(
                    navController = navController,
                    cartViewModel = cartViewModel
                )
            }
            composable(Screen.Checkout.route) {
                CheckoutScreen(
                    navController = navController,
                    cartViewModel = cartViewModel
                )
            }
            composable(
                route = "${Screen.OrderSuccess.route}/{orderId}",
                arguments = listOf(navArgument("orderId") { type = NavType.StringType })
            ) { backStackEntry ->
                val orderId = backStackEntry.arguments?.getString("orderId") ?: "000000"
                OrderSuccessScreen(
                    navController = navController,
                    orderNumber = orderId
                )
            }
            composable(Screen.Profile.route) {
                ProfileScreen(
                    navController = navController,
                    cartViewModel = cartViewModel
                )
            }
        }
    }
}
