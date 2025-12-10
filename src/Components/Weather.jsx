import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const apiKey = "0350682beda3a5cd8c0babb8892224fa";

    const getWeather = async () => {
        if (!city.trim()) {
            setError("Please enter a city name");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            setWeather(response.data);
        } catch (error) {
            setError("City not found. Please check the name and try again.");
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") getWeather();
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
                fullWidth: true,
            }}
        >
            <Paper elevation={10} sx={{ padding: 3, width: 280, height: 'auto', borderRadius: 3 }}>
                <Typography
                    variant="h5"
                    component="h1"
                    gutterBottom
                    sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "center" }}
                >
                    Weather App
                </Typography>

                <Box sx={{ display: "flex", gap: 1, marginBottom: 2 }}>
                    <TextField
                        label="Enter city name"
                        
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                        fullWidth
                        size="small"
                        className="textBox"
                    />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/024/825/155/non_2x/3d-weather-icon-sun-and-wind-free-png.png"
                        alt="weather icon"
                        style={{ width: 100 }}
                    />
                </Box>

                {error && (
                    <Typography color="error" sx={{ marginBottom: 2, textAlign: "center", fontSize: "0.875rem" }}>
                        {error}
                    </Typography>
                )}

                {loading && (
                    <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
                        <CircularProgress size={30} />
                    </Box>
                )}

                {weather && (
                    <Card sx={{ backgroundColor: "#f5f5f5", marginTop: 2, borderRadius: 2 }}>
                        <CardContent sx={{ padding: 2 }}>
                            <Typography variant="h4" sx={{ color: "#667eea", textAlign: "center" }}>
                                {weather.main.temp}°C
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ fontWeight: "bold", marginBottom: 1, textAlign: "center" }}
                            >
                                {weather.name}, {weather.sys.country}
                            </Typography>
                            <Typography variant="body2" sx={{ textTransform: "capitalize", marginBottom: 1, textAlign: "center" }}>
                                {weather.weather[0].description}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" >
                                Feels like: {weather.main.feels_like}°C
                            </Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ textAlign: "end", display: "inline",marginLeft:7 }}>
                                Humidity: {weather.main.humidity}%
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </Paper>
        </Box>
    );
};

export default Weather;
