async function bucketSort() {
    var n = size;
    var max = Math.max(...arr);
    var min = Math.min(...arr);
    var bucketCount = Math.floor((max - min) / 10) + 1;
    var buckets = Array.from({ length: bucketCount }, () => []);

    // Step 1: Distribute the elements into buckets
    for (var i = 0; i < n; i++) {
        var index = Math.floor((arr[i] - min) / 10);
        buckets[index].push(arr[i]);
        setColor(i, SELECTED);
        await sleep(delay);
        setColor(i, UNSORTED);
    }

    // Step 2: Sort each bucket using insertion sort
    var sortedIndex = 0;
    for (var i = 0; i < bucketCount; i++) {
        if (buckets[i].length > 0) {
            await insertionSortBucket(buckets[i]);
            for (var j = 0; j < buckets[i].length; j++) {
                arr[sortedIndex] = buckets[i][j];
                setHeight(sortedIndex, arr[sortedIndex] + 'px');
                setColor(sortedIndex, SORTED);
                await sleep(delay);
                sortedIndex++;
            }
        }
    }
}

async function insertionSortBucket(bucket) {
    for (var i = 1; i < bucket.length; i++) {
        var key = bucket[i];
        var j = i - 1;
        while (j >= 0 && bucket[j] > key) {
            bucket[j + 1] = bucket[j];
            j--;
        }
        bucket[j + 1] = key;
    }
}
