import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import capsize from 'react-native-capsize'
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter'
import { AppLoading } from 'expo'
import Slider from '@react-native-community/slider'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

const fontMetrics = {
  capHeight: 2048,
  ascent: 2728,
  descent: -680,
  lineGap: 0,
  unitsPerEm: 2816,
}

function Capsize() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
  })

  const [capHeight, setCapHeight] = React.useState(18)
  const [lineGap, setLineGap] = React.useState(8)
  const [numberOfLines, setNumberOfLines] = React.useState(0)

  const textStyle = {
    ...capsize({
      capHeight,
      lineGap,
      fontMetrics,
    }),
  }

  return fontsLoaded ? (
    <SafeAreaView style={styles.container}>
      <Text>{`Cap Height: ${capHeight}`}</Text>
      <Slider
        minimumValue={8}
        maximumValue={28}
        onValueChange={setCapHeight}
        onSlidingComplete={setCapHeight}
        step={1}
        minimumTrackTintColor="rgb(237, 100, 166)"
        maximumTrackTintColor="#FDE2EB"
      />
      <Text>{`Line Gap: ${lineGap}`}</Text>
      <Slider
        minimumValue={0}
        maximumValue={28}
        onValueChange={setLineGap}
        onSlidingComplete={setLineGap}
        step={1}
        minimumTrackTintColor="rgb(237, 100, 166)"
        maximumTrackTintColor="#FDE2EB"
      />
      <View
        style={styles.textContainer}
        onLayout={(e) => {
          const lineNumber = Math.ceil(
            e.nativeEvent.layout.height / (capHeight + lineGap)
          )

          setNumberOfLines(lineNumber)
        }}
      >
        <View style={styles.textHighlight}>
          {Array(numberOfLines)
            .fill(null)
            .map((_, index) => (
              <View
                key={index}
                style={{
                  height: capHeight,
                  backgroundColor: '#FDE2EB',
                }}
              />
            ))}
        </View>
        <Text style={textStyle}>
          Lorem ipsum Lolor sit amet, Lonsectetur adipiscing elit. Duis eu
          ornare nisi, sed feugiat metus. Pellentesque rutrum vel metus non
          dignissim. Aenean egestas neque mattis mi maximus luctus. Praesent et
          commodo dui, nec eleifend lectus. Pellentesque blandit nisi tellus, id
          efficitur urna consectetur id. Sed convallis tempor dui vel aliquet.
        </Text>
      </View>
    </SafeAreaView>
  ) : (
    <AppLoading />
  )
}
export default function App() {
  return (
    <SafeAreaProvider>
      <Capsize />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  textContainer: {
    marginTop: 16,
  },
  textHighlight: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
})
