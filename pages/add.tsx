import { useState } from "react";
import { Box, Button, Input, ColorPicker } from "@chakra-ui/react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useLocation } from "../store/locationstore";

