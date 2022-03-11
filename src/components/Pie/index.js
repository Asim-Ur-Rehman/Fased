import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const CustomPie = ({
    data = []
}) => {
  const radius = 65;
  const circleCircumference = 2 * Math.PI * radius;

  const expired = 2;
  const nonExpired = 4;
  const total = data?.length;

//   const data = [];

//   for (let i = 1; i <= expired; i++) {
//     data.push({
//       color: "#F0A500",
//     });
//   }

//   for (let i = 1; i <= nonExpired; i++) {
//     data.push({ color: "#334756" });
//   }

  const percentage = (1 / total) * 100;
  const strokeDashoffset =
    circleCircumference - (circleCircumference * percentage) / 100;

  const angle = (1 / total) * 360;
  const sliceSpacing = total === 1 ? 0 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.graphWrapper}>
        <Svg height="70" width="70" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            { total === 0 ? (
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#F1F6F9"
                fill="transparent"
                strokeWidth="25"
              />
             ) : (
               data.map((element, index) => (
                <Circle
                  key={index}
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke={element}
                  fill="transparent"
                  strokeWidth="22"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={strokeDashoffset + sliceSpacing}
                  rotation={angle * index}
                  originX="90"
                  originY="90"
                />
              ))
             )}
          </G>
        </Svg>
        <Text style={styles.label}>{total}</Text>
      </View>
    </View>
  );
};

export default CustomPie;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#fff',
    width: '55%',
    height: '55%',
  },
  label: {
    position: "absolute",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "#082032",
    borderRadius: 100,
    justifyContent: 'center', 
    alignItems: 'center'
  },
});
