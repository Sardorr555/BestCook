package com.bestcook.app.ui.screens

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Home
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.bestcook.app.ui.navigation.Screen

@Composable
fun OrderSuccessScreen(
    navController: NavController,
    orderNumber: String
) {
    // Pulsing animation for the checkmark circle
    val infiniteTransition = rememberInfiniteTransition(label = "pulse")
    val pulseScale by infiniteTransition.animateFloat(
        initialValue = 1f,
        targetValue = 1.08f,
        animationSpec = infiniteRepeatable(
            animation = tween(900, easing = EaseInOut),
            repeatMode = RepeatMode.Reverse
        ),
        label = "pulseScale"
    )

    // Entry scale animation
    var visible by remember { mutableStateOf(false) }
    val enterScale by animateFloatAsState(
        targetValue = if (visible) 1f else 0.5f,
        animationSpec = spring(
            dampingRatio = Spring.DampingRatioMediumBouncy,
            stiffness = Spring.StiffnessLow
        ),
        label = "enterScale"
    )
    LaunchedEffect(Unit) { visible = true }

    // Delivery steps
    val steps = listOf(
        Triple("✅", "Buyurtma qabul qilindi", true),
        Triple("👨‍🍳", "Oshpaz tayyorlayapti", true),
        Triple("🛵", "Kuryer yo'lda", false),
        Triple("🏠", "Sizga yetkazildi", false)
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    colors = listOf(Color(0xFFFFFDF9), Color(0xFFFFF0E6))
                )
            ),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(24.dp)
        ) {

            // Animated checkmark circle
            Box(
                modifier = Modifier
                    .size(130.dp)
                    .scale(enterScale * pulseScale)
                    .clip(CircleShape)
                    .background(
                        Brush.radialGradient(
                            colors = listOf(Color(0xFFE8622B), Color(0xFFF28B60))
                        )
                    ),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Check,
                    contentDescription = "Success",
                    tint = Color.White,
                    modifier = Modifier.size(64.dp)
                )
            }

            // Title & subtitle
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text(
                    text = "Buyurtma Qabul Qilindi! 🎉",
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.ExtraBold,
                    color = Color(0xFF1A1A1A),
                    textAlign = TextAlign.Center
                )
                Text(
                    text = "Buyurtma №$orderNumber",
                    style = MaterialTheme.typography.bodyMedium,
                    color = Color(0xFF888888),
                    fontWeight = FontWeight.Medium
                )
                Text(
                    text = "Taomingiz tayyorlanmoqda va yaqin orada sizga yetkaziladi!",
                    style = MaterialTheme.typography.bodyMedium,
                    color = Color(0xFF555555),
                    textAlign = TextAlign.Center,
                    lineHeight = 22.sp
                )
            }

            // Delivery status tracker
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
            ) {
                Column(
                    modifier = Modifier.padding(20.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    Text(
                        text = "Yetkazib berish holati",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF1A1A1A)
                    )

                    steps.forEachIndexed { index, (emoji, label, isDone) ->
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(14.dp)
                        ) {
                            // Step circle indicator
                            Box(
                                modifier = Modifier
                                    .size(40.dp)
                                    .clip(CircleShape)
                                    .background(
                                        if (isDone) Color(0xFFE8622B) else Color(0xFFF0F0F0)
                                    ),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = emoji,
                                    fontSize = 18.sp
                                )
                            }

                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = label,
                                    style = MaterialTheme.typography.bodyMedium,
                                    fontWeight = if (isDone) FontWeight.Bold else FontWeight.Normal,
                                    color = if (isDone) Color(0xFF1A1A1A) else Color(0xFFAAAAAA)
                                )
                                if (index == 2) { // Kuryer yo'lda — show ETA
                                    Text(
                                        text = "~25-35 daqiqa",
                                        style = MaterialTheme.typography.labelSmall,
                                        color = Color(0xFFE8622B),
                                        fontWeight = FontWeight.SemiBold
                                    )
                                }
                            }

                            // Checkmark for done steps
                            if (isDone) {
                                Box(
                                    modifier = Modifier
                                        .size(22.dp)
                                        .clip(CircleShape)
                                        .background(Color(0xFF4CAF50)),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Icon(
                                        imageVector = Icons.Default.Check,
                                        contentDescription = "Done",
                                        tint = Color.White,
                                        modifier = Modifier.size(14.dp)
                                    )
                                }
                            }
                        }

                        // Connector line (not after last)
                        if (index < steps.size - 1) {
                            Box(
                                modifier = Modifier
                                    .padding(start = 19.dp)
                                    .width(2.dp)
                                    .height(12.dp)
                                    .background(
                                        if (isDone) Color(0xFFE8622B) else Color(0xFFEEEEEE),
                                        shape = RoundedCornerShape(1.dp)
                                    )
                            )
                        }
                    }
                }
            }

            // Estimated time chip
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(50))
                    .background(Color(0xFFFFF0E6))
                    .padding(horizontal = 20.dp, vertical = 10.dp)
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Text("🕐", fontSize = 18.sp)
                    Text(
                        text = "Taxminiy vaqt: 25-35 daqiqa",
                        style = MaterialTheme.typography.bodyMedium,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFFE8622B)
                    )
                }
            }

            // Go to home button
            Button(
                onClick = {
                    navController.navigate(Screen.Home.route) {
                        popUpTo(Screen.Home.route) { inclusive = true }
                    }
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(54.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFE8622B)),
                shape = RoundedCornerShape(50)
            ) {
                Icon(
                    imageVector = Icons.Default.Home,
                    contentDescription = "Home",
                    tint = Color.White
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "Bosh sahifaga qaytish",
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp,
                    color = Color.White
                )
            }
        }
    }
}
