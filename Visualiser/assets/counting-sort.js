
async function countingSort() {
    var n = size;
    var max = Math.max(...arr);
    var min = Math.min(...arr);
    var range = max - min + 1;
    var count = Array(range).fill(0);
    var output = Array(n).fill(0);

    // Step 1: Count each element
    for (var i = 0; i < n; i++) {
        setColor(i, SELECTED);
        count[arr[i] - min]++;
        await sleep(delay);
        setColor(i, UNSORTED);
    }

    // Step 2: Modify the count array
    for (var i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    // Step 3: Build the output array
    for (var i = n - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }

    // Step 4: Replace original array with sorted values
    for (var i = 0; i < n; i++) {
        arr[i] = output[i];
        setHeight(i, arr[i] + 'px');
        setColor(i, SORTED);
        await sleep(delay);
    }
}
