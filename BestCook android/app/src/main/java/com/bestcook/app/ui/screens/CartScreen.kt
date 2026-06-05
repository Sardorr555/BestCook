package com.bestcook.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.bestcook.app.model.CartItem
import com.bestcook.app.ui.navigation.Screen
import com.bestcook.app.viewmodel.CartViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CartScreen(
    navController: NavController,
    cartViewModel: CartViewModel
) {
    val cartItems by cartViewModel.cartItems.collectAsState()
    val subtotal = cartViewModel.getCartTotal()
    val deliveryFee = if (subtotal > 0) 15000 else 0
    val total = subtotal + deliveryFee

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Savat", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)) },
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
            if (cartItems.isEmpty()) {
                EmptyCartState(onGoHome = { navController.navigate(Screen.Home.route) })
            } else {
                LazyColumn(
                    modifier = Modifier.weight(1f),
                    contentPadding = PaddingValues(16.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    items(cartItems) { item ->
                        CartItemRow(
                            item = item,
                            onQuantityIncrease = { cartViewModel.updateQuantity(item.id, item.quantity + 1) },
                            onQuantityDecrease = { cartViewModel.updateQuantity(item.id, item.quantity - 1) },
                            onDelete = { cartViewModel.removeFromCart(item.id) }
                        )
                    }
                }

                // Billing card
                Card(
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    shape = RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp),
                    elevation = CardDefaults.cardElevation(defaultElevation = 8.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text("Taomlar summasi", color = MaterialTheme.colorScheme.secondary)
                            Text("${subtotal.toString().reversed().chunked(3).joinToString(" ").reversed()} so'm", fontWeight = FontWeight.Bold)
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text("Yetkazib berish", color = MaterialTheme.colorScheme.secondary)
                            Text("${deliveryFee.toString().reversed().chunked(3).joinToString(" ").reversed()} so'm", fontWeight = FontWeight.Bold)
                        }
                        Spacer(modifier = Modifier.height(12.dp))
                        Divider(color = MaterialTheme.colorScheme.outlineVariant, thickness = 0.5.dp)
                        Spacer(modifier = Modifier.height(12.dp))
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text("Umumiy summa", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                            Text(
                                text = "${total.toString().reversed().chunked(3).joinToString(" ").reversed()} so'm",
                                style = MaterialTheme.typography.titleLarge.copy(color = MaterialTheme.colorScheme.primary),
                                fontWeight = FontWeight.Bold
                            )
                        }
                        Spacer(modifier = Modifier.height(16.dp))
                        Button(
                            onClick = { navController.navigate(Screen.Checkout.route) },
                            modifier = Modifier.fillMaxWidth(),
                            colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                            shape = RoundedCornerShape(50),
                            contentPadding = PaddingValues(vertical = 14.dp)
                        ) {
                            Text("Buyurtma Rasmiylashtirish", fontWeight = FontWeight.Bold, fontSize = 16.sp)
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun EmptyCartState(onGoHome: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Box(
            modifier = Modifier
                .size(120.dp)
                .background(Color(0xFFFFF0E6), shape = CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Text("🛒", fontSize = 52.sp)
        }
        Spacer(modifier = Modifier.height(24.dp))
        Text(
            text = "Savatingiz bo'sh",
            style = MaterialTheme.typography.titleLarge,
            fontWeight = FontWeight.Bold
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = "Hozircha savatingizga hech narsa qo'shmadingiz. O'z xohishingizga ko'ra mazali taom yig'ing!",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.secondary,
            modifier = Modifier.padding(horizontal = 16.dp),
            lineHeight = 20.sp,
            textAlign = androidx.compose.ui.text.style.TextAlign.Center
        )
        Spacer(modifier = Modifier.height(28.dp))
        Button(
            onClick = onGoHome,
            colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
            shape = RoundedCornerShape(50),
            contentPadding = PaddingValues(horizontal = 24.dp, vertical = 12.dp)
        ) {
            Text("Taom Tanlash", fontWeight = FontWeight.Bold)
        }
    }
}

@Composable
fun CartItemRow(
    item: CartItem,
    onQuantityIncrease: () -> Unit,
    onQuantityDecrease: () -> Unit,
    onDelete: () -> Unit
) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.5.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.weight(1f)) {
                    Box(
                        modifier = Modifier
                            .size(50.dp)
                            .background(Color(0xFFFFFDF9), shape = RoundedCornerShape(10.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(item.imageEmoji, fontSize = 24.sp)
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Column {
                        Text(
                            text = item.name,
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = FontWeight.Bold,
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis
                        )
                        Text(
                            text = "${(item.price * item.quantity).toString().reversed().chunked(3).joinToString(" ").reversed()} so'm",
                            style = MaterialTheme.typography.bodyMedium.copy(color = MaterialTheme.colorScheme.primary),
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
                IconButton(onClick = onDelete) {
                    Icon(imageVector = Icons.Default.Delete, contentDescription = "Delete", tint = MaterialTheme.colorScheme.error)
                }
            }

            Text(
                text = item.details,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.secondary,
                modifier = Modifier.padding(vertical = 8.dp),
                lineHeight = 16.sp
            )

            if (item.allergens.isNotEmpty()) {
                Row(
                    modifier = Modifier.padding(bottom = 8.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(imageVector = Icons.Default.Warning, contentDescription = "Allergen", tint = Color(0xFFFFB300), modifier = Modifier.size(12.dp))
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = "Allergenlar cheklangan: ${item.allergens.joinToString(", ")}",
                        style = MaterialTheme.typography.labelSmall,
                        color = Color(0xFFC62828),
                        fontWeight = FontWeight.Bold
                    )
                }
            }

            Divider(color = MaterialTheme.colorScheme.outlineVariant, thickness = 0.5.dp)

            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text("Soni:", style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.secondary)
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(30.dp)
                            .background(Color(0xFFFFF0E6), shape = RoundedCornerShape(8.dp))
                            .clickable(onClick = onQuantityDecrease),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("-", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
                    }
                    Text(text = item.quantity.toString(), fontWeight = FontWeight.Bold)
                    Box(
                        modifier = Modifier
                            .size(30.dp)
                            .background(Color(0xFFFFF0E6), shape = RoundedCornerShape(8.dp))
                            .clickable(onClick = onQuantityIncrease),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("+", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
                    }
                }
            }
        }
    }
}
