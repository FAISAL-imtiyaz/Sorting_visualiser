async function shellSort() {
    var n = size;
    for (var gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (var i = gap; i < n; i++) {
            var temp = arr[i];
            var j = i;

            setColor(i, SELECTED); // Highlight the selected element

            while (j >= gap && arr[j - gap] > temp) {
                await sleep(delay); // Add delay for visualization
                setColor(j - gap, COMPARE); // Compare elements

                arr[j] = arr[j - gap];
                setHeight(j, arr[j] + 'px'); // Update the height for visualization

                setColor(j, UNSORTED); // Reset color
                j -= gap;

                await sleep(delay); // Another delay
            }

            arr[j] = temp;
            setHeight(j, temp + 'px'); // Update height of the current element
            setColor(i, UNSORTED); // Reset color
            setColor(j, SORTED); // Mark as sorted
        }
    }

    // Ensure the array is marked as sorted at the end
    for (var i = 0; i < n; i++) {
        setColor(i, SORTED);
        await sleep(delay);
    }
}
