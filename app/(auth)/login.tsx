import React from "react";
import { Button, Card, Text } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "@/components/common/TextInput";
import { CustomButton } from "@/components/common/CustomButton";
import { PasswordInput } from "@/components/common/PasswordInput";
import { Link, router } from "expo-router";
import { isTablet } from "@/utils/deviceInfo";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { useTenantStore } from "@/hooks/stores/useTenantStore";

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  auth_field: Yup.string().required(),
  email: Yup.string()
    .email("Invalid email address")
    .when("auth_field", {
      is: "email",
      then: (schema: any) => schema.required("Email is required"),
      otherwise: (schema: any) => schema.notRequired(),
    }),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number")
    .when("auth_field", {
      is: "phone",
      then: (schema: any) => schema.required("Phone number is required"),
    }),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen = () => {
  const { height } = useWindowDimensions();
  const checkIsTablet = isTablet();
  const { login } = useAuthStore();
  const { setCurrentTenantId } = useTenantStore();

  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView style={[styles.container, { height: height }]}>
        <Card
          containerStyle={[styles.content, checkIsTablet && { width: 500 }]}
        >
          <Card.Title h3>SignIn</Card.Title>
          <TextInput
            label={"Email/Phone"}
            placeholder="Enter your email or phone number"
          />
          <PasswordInput label={"Password"} placeholder="Enter your password" />
          <CustomButton
            title={"Login"}
            onPress={() => {
              setCurrentTenantId("abc123");
              login(
                {
                  id: 1,
                  name: "Eric Mensah",
                  phone: "",
                  sex: "female",
                },
                { refreshToken: "123", accessToken: "122" }
              );

              router.replace("/(main)");
            }}
          />
          <View style={styles.forgotContent}>
            <Button type="clear">Forgot Password?</Button>
            <MaterialIcons size={14} name="arrow-forward" />
          </View>
        </Card>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  content: {
    rowGap: 16,
    alignItems: "center",
    width: 380,
  },
  forgotText: {
    textAlign: "center",
  },
  forgotContent: {
    marginTop: 20,
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
