import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";

const WarningSignal = () => {
  const ripple1 = useRef(new Animated.Value(0)).current;
  const ripple2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = (anim, delay = 0) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 3000,
            delay,
            useNativeDriver: false,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false,
          }),
        ])
      ).start();
    };

    animate(ripple1, 0);
    animate(ripple2, 1500);
  }, []);

  const makeRippleStyle = (anim) => {
    const size = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 70],
    });
    const opacity = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.6, 0],
    });

    return {
      width: size,
      height: size,
      borderRadius: Animated.divide(size, 2),
      opacity,
    };
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ripple, makeRippleStyle(ripple1)]} />
      <Animated.View style={[styles.ripple, makeRippleStyle(ripple2)]} />

      {/* <View style={styles.core} /> */}
    </View>
  );
};

export default WarningSignal;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  ripple: {
    position: "absolute",
    backgroundColor: "red",
  },
  core: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "red",
  },
});
