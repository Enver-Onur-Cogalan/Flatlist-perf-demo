// 📄 flatlist-perf-demo/apps/baseline/App.tsx
// Baseline implementation: default FlatList props, index-based keyExtractor.
// Intentionally NOT optimized—serves as a performance control sample.

import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";


/** List item type */
interface Item {
    id: number;
    title: string;
}

/** Generate 1 000 dummy rows */
const DATA: Item[] = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    title: `Item #${i + 1}`,
}));

/** Row componnet (no memoization) */
const ItemRow = ({ title }: { title: string }) => (
    <View style={styles.row}>
        <Text style={styles.text}>{title}</Text>
    </View>
);

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <ItemRow title={item.title} />}
                /**
                 * BaseLine: use index as key (anti-pattern)
                 * This triggers full re-render when items are added/removed.
                 */
                keyExtractor={(_, index) => index.toString()}
            /* No initialNumToRender, maxToRenderPerBatch, windowSize tweaks */
            />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        padding: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#DDD',
    },
    text: {
        fontSize: 16,
    },
});