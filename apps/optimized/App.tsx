// 📄 flatlist-perf-demo/apps/optimized/App.tsx
// Optimized implementation: tweaks from Medium article applied.

import React, { memo, useCallback, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import throttle from 'lodash.throttle';

/** List item type */
interface Item {
    id: number;
    title: string;
}

/** Generate first page of dummy rows (50) */
const PAGE_SIZE = 50;
const createPage = (page: number): Item[] =>
    Array.from({ length: PAGE_SIZE }, (_, i) => {
        const n = page * PAGE_SIZE + i + 1;
        return { id: n, title: `Item #${n}` };
    });

const ROW_HEIGHT = 53;

/** Row component - memoized to avoid unnecassary re-renders */
const ItemRow = memo(({ title }: { title: string }) => (
    <View style={styles.row}>
        <Text style={styles.text}>{title}</Text>
    </View>
));
ItemRow.displayName = 'ItemRow';

export default function App() {
    const [data, setData] = useState<Item[]>(createPage(0));
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    /** Stable keyExtractor using id */
    const keyExtractor = useCallback((item: Item) => item.id.toString(), []);

    /** Fetch next page - throttled to prevent rapid multiple calls */
    const fetchMore = useCallback(
        throttle(() => {
            if (loading || !hasMore) return;
            setLoading(true);
            // Simulate async API delay
            setTimeout(() => {
                const nextPage = page + 1;
                const nextData = createPage(nextPage);
                // Stop after 1000 items for demo
                if ((nextPage + 1) * PAGE_SIZE >= 1000) {
                    setHasMore(false);
                }
                setData(prev => [...prev, ...nextData]);
                setPage(nextPage);
                setLoading(false);
            }, 500);
        }, 800),
        [loading, hasMore, page],
    );

    /** FlatListÇ fixed item height -> O(1) scrollTo */
    const getItemLayout = useCallback(
        (_: ArrayLike<Item> | null | undefined, index: number) => ({
            length: ROW_HEIGHT,
            offset: ROW_HEIGHT * index,
            index,
        }),
        [],
    );

    console.log('data length', data.length);
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <ItemRow title={item.title} />}
                keyExtractor={keyExtractor}
                initialNumToRender={8}
                maxToRenderPerBatch={8}
                windowSize={5}
                removeClippedSubviews
                onEndReached={fetchMore}
                onEndReachedThreshold={0.4}
                ListFooterComponent={loading ? <ActivityIndicator /> : null}
                getItemLayout={getItemLayout}
            />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        height: ROW_HEIGHT,
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#DDD',
    },
    text: {
        fontSize: 16,
    },
});