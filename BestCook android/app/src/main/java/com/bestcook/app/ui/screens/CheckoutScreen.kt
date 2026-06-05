package com.bestcook.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.bestcook.app.ui.navigation.Screen
import com.bestcook.app.viewmodel.CartViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CheckoutScreen(
    navController: NavController,
    cartViewModel: CartViewModel
) {
    var name by remember { mutableStateOf("") }
    var phone by remember { mutableStateOf("+998") }
    var address by remember { mutableStateOf("") }
    var paymentMethod by remember { mutableStateOf("Naqd pul") }

    val orderTotal = cartViewModel.getCartTotal() + 15000 // subtotal + delivery
    val isFormValid = name.isNotBlank() && phone.length >= 12 && address.isNotBlank()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Buyurtma Berish", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(imageVector = Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background)
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(MaterialTheme.colorScheme.background)
        ) {
            Column(
                modifier = Modifier
                    .weight(1f)
                    .verticalScroll(rememberScrollState())
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Text(
                    text = "Etkazib berish ma'lumotlari",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )

                OutlinedTextField(
                    value = name,
                    onValueChange = { name = it },
                    label = { Text("Ism sharifingiz") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp)
                )

                OutlinedTextField(
                    value = phone,
                    onValueChange = { if (it.startsWith("+998")) phone = it },
                    label = { Text("Telefon raqamingiz") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone),
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp)
                )

                OutlinedTextField(
                    value = address,
                    onValueChange = { address = it },
                    label = { Text("Yetkazib berish manzili") },
                    modifier = Modifier.fillMaxWidth(),
                    minLines = 2,
                    shape = RoundedCornerShape(12.dp)
                )

                Spacer(modifier = Modifier.height(8.dp))

                Text(
                    text = "To'lov turi",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )

                listOf("Naqd pul", "Payme / Click card", "Xalqaro karta (Visa/Mastercard)").forEach { method ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp),
                        verticalAlignment = androidx.compose.ui.Alignment.CenterVertically
                    ) {
                        RadioButton(
                            selected = paymentMethod == method,
                            onClick = { paymentMethod = method }
                        )
                        Text(
                            text = method,
                            style = MaterialTheme.typography.bodyLarge,
                            modifier = Modifier.padding(start = 8.dp)
                        )
                    }
                }
            }

            // Bottom summary box
            Card(
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                shape = RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp),
                elevation = CardDefaults.cardElevation(defaultElevation = 8.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = androidx.compose.ui.Alignment.CenterVertically
                    ) {
                        Column {
                            Text("Jami to'lov:", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.secondary)
                            Text(
                                text = "${orderTotal.toString().reversed().chunked(3).joinToString(" ").reversed()} so'm",
                                style = MaterialTheme.typography.titleLarge.copy(color = MaterialTheme.colorScheme.primary),
                                fontWeight = FontWeight.Bold
                            )
                        }
                        Button(
                            onClick = {
                                val order = cartViewModel.placeOrder(name, phone, address)
                                val orderId = order?.id?.takeLast(6) ?: "000000"
                                navController.navigate("${Screen.OrderSuccess.route}/$orderId") {
                                    popUpTo(Screen.Home.route)
                                }
                            },
                            enabled = isFormValid,
                            colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                            shape = RoundedCornerShape(50),
                            contentPadding = PaddingValues(horizontal = 24.dp, vertical = 12.dp)
                        ) {
                            Text("Tasdiqlash", fontWeight = FontWeight.Bold, fontSize = 15.sp)
                        }
                    }
                }
            }
        }
    }
}
