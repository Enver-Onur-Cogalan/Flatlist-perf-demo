// 📄 flatlist-perf-demo/App.tsx
// Root selector for single-project setup.
// Switches between Baseline and Optimized demos with:
// 1. Env var (BUILD_TYPE)
// 2. Manual toggle constant (USE_OPTIMIZED)
// 3. Simple in-app UI (Debug button)

import React, { useState } from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import BaselineApp from './apps/baseline/App';
import OptimizedApp from './apps/optimized/App';

// -----------------------------------------------------------------------------
// 1. Environment variable switch (e.g., BUILD_TYPE=optimized yarn ios)
// If you don’t want env handling, comment out the next 3 lines.
const buildType = process.env.BUILD_TYPE as 'baseline' | 'optimized' | undefined;
const defaultIsOptimized = buildType === 'optimized';

// 2. Manual hard-coded toggle (falls back when BUILD_TYPE undefined)
const USE_OPTIMIZED = defaultIsOptimized ?? false; // set true / false as you like
// -----------------------------------------------------------------------------

export default function App() {
  const [isOptimized, setIsOptimized] = useState(USE_OPTIMIZED);

  // 3. Optional UI toggle in Debug (press button to swap implementations)
  if (__DEV__) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>{isOptimized ? <OptimizedApp /> : <BaselineApp />}</View>
        <Button
          title={isOptimized ? 'Switch to Baseline' : 'Switch to Optimized'}
          onPress={() => setIsOptimized(!isOptimized)}
        />
      </SafeAreaView>
    );
  }

  // Release build: no toggle UI – just chosen variant
  return isOptimized ? <OptimizedApp /> : <BaselineApp />;
}

