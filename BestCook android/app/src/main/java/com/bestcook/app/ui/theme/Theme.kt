package com.bestcook.app.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val LightColorScheme = lightColorScheme(
    primary = OrangePrimary,
    onPrimary = CardSurface,
    primaryContainer = OrangeLightContainer,
    onPrimaryContainer = OrangePrimary,
    secondary = CharcoalMuted,
    onSecondary = CardSurface,
    background = CreamBackground,
    onBackground = CharcoalDark,
    surface = CardSurface,
    onSurface = CharcoalDark
)

// We fall back to LightColorScheme for consistency with the warm design of Best Cook,
// but provide a slightly dark scheme if dark mode is enforced.
private val DarkColorScheme = darkColorScheme(
    primary = OrangePrimary,
    onPrimary = CardSurface,
    primaryContainer = Color(0xFF5D200A),
    onPrimaryContainer = Color(0xFFFFCCB8),
    secondary = Color(0xFFD3C2C0),
    onSecondary = Color(0xFF231E1E),
    background = Color(0xFF1C1A1A),
    onBackground = Color(0xFFEDE0DF),
    surface = Color(0xFF2C2423),
    onSurface = Color(0xFFEDE0DF)
)

@Composable
fun BestCookTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.background.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = !darkTheme
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
