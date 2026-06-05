package com.bestcook.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.bestcook.app.ui.navigation.MainScreenContainer
import com.bestcook.app.ui.theme.BestCookTheme
import com.bestcook.app.viewmodel.CartViewModel

class MainActivity : ComponentActivity() {
    // Shared CartViewModel to hold items across screens (Constructor, Cart, Checkout, Profile)
    private val cartViewModel: CartViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            BestCookTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    MainScreenContainer(cartViewModel = cartViewModel)
                }
            }
        }
    }
}
