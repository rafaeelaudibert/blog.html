---
layout: post
title:  Asymptotic Notation and Basic Sorting Algorithms
series: Sorting [1/3]
date:   2018-09-03 12:00:00 +0300
description: >
 First post of a series of 3 about Sorting Algorithms,
 with a basic introduction to Asymptotic Notation. # Add post description (optional)
img: sorting-1-main.jpg # Add image post (optional)
tags: [Computer, Asymptotic, Efficiency, UFRGS, C, JavaScript]
main_tags: [Asymptotic, Efficiency, JavaScript]
reading_time: '18min'
js-files: [sorting-1.js]
author: Rafael Audibert # Add name author (optional)
---

<!-- markdownlint-disable-file MD033 -->
This is the first article, in a series of 3, on which we will talk about Sorting Algorithms with tons of charts. On this first one, we will also make an exploration about asymptotic complexity in general. We will also have a playground at the end of the article, running with `async` JavaScript code, which will be emulated live on this page, through an API connected to a backend server. You will be able to experiment some stuff (check it later).
> The JavaScript code will run in an AWS server, which will be requested through an API call. The graphics data were generated with a code written in C, compiled with GCC version $$5.1.0$$ which can be downloaded in [this]({{site.baseurl}}/assets/zip/sorting-1.zip) zip file containing the CSV data used as input.

## Analyzing complexity time cases ⏱️

First, we must analyze and understand the $$\Theta$$(theta) asymptotic notation of some simple functions. To do so, we must find a given value $$n$$, which when applied to $$2$$ another function of the same complexity, will make the former to be between then, that is, we have a function with a higher asymptotic value and another with a lower one. We will have some charts to help us understand what is going on (I won't say it won't have math in some of them). Remember to zoom in (maybe it will look a bit clunky, but you can do it) to see more details, especially in those where we can barely see a difference between the lines.

<div id="accordion">
        <div class="card">
          <div class="card-header" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <h5 class="mb-0">
              <button class="btn btn-link collapsed">
                <span class="formula">$$50n$$</span>
              </button>
            </h5>
          </div>
          <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
            <div class="card-body">
              This one can easily be seen in the chart below. We used 40 and 60 as an upper and a lower constant, but we could use anything just a bit higher or lower than 50 to show that this function has a complexity of \(\Theta(n)\). As you can see this complexity can be seen since the origin (you can check it out zooming in the chart), making our value \(n\), which is the lower threshold for the \(\Theta\) notation, to be 0. <br/>
              <canvas id="complexity1" class="chartjs" width="undefined" height="undefined"></canvas>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <h5 class="mb-0">
              <button class="btn btn-link collapsed">
                <div class="formula">$$n^2 + 2n + 10$$</div>
              </button>
            </h5>
          </div>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
            <div class="card-body">
              This one can also easily be proven to have a complexity of \(\Theta(n^2)\). If you zoom in closer to \(x = 0\), you can see how \(n^2 + 2n + 10\) curve is higher than \(2n^2\), but the later overcomes it really soon, between \(x=4\) and \(x=5\). As you can see, the purple curve (the one which is interesting for us) is just a little bit higher than the blue one, but it will be higher than it forever, increasing its margin little by little, making our complexity, as stated before, \(\Theta(n^2)\). <br/>
              <canvas id="complexity2" class="chartjs" width="undefined" height="undefined"></canvas>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingThree" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            <h5 class="mb-0">
              <button class="btn btn-link collapsed">
                <span class="formula">$$n + \log n$$</span>
              </button>
            </h5>
          </div>
          <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
            <div class="card-body">
              This is a easy one. Just looking to the chart we can see it has a \(\Theta(n)\) complexity, because \(n \gg \log (n)\), so we can treat \(\log (n)\) as a constant. <br/>
              <canvas id="complexity3" class="chartjs" width="undefined" height="undefined"></canvas>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" data-toggle="collapse" data-target="#collapseFour" id="headingFour">
            <h5 class="mb-0">
              <button class="btn btn-link collapsed">
                <span class="formula">$$n^3 -100 n^2$$</span>
              </button>
            </h5>
          </div>
          <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordion">
            <div class="card-body">
              That's a tricky one, because as you can see the purple curve goes below the yellow one (it even goes negative!) for a long time, intersecting it only at \(x=200\) (you can verify it by calculating \(n^3-100n^2 = {n^3 \over 2}\) or zooming in the chart close to \(x=200\), but as \(n^3 \gg n^2\), we have a time complexity of \(\Theta(n^3)\). <br/>
              <canvas id="complexity4" class="chartjs" width="undefined" height="undefined"></canvas>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" data-toggle="collapse" data-target="#collapseFive" id="headingFive">
            <h5 class="mb-0">
              <button class="btn btn-link collapsed">
                <span class="formula">$${2n^2 \over 3n^2-1}$$</span>
              </button>
            </h5>
          </div>
          <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordion">
            <div class="card-body">
              Maybe you can not see the complexity of this formula right in time (I didn't), but we can prove it with what we learned in our Calculus classes, as soon as we realize that a limit solves it with mastery, as \(\lim_{x\to\infty} {2n^2 \over 3n^2-1} = {2 \over 3}\). In conclusion, our time complexity is constant, this is \(\Theta(1)\). <br/>
              <canvas id="complexity5" class="chartjs" width="undefined" height="undefined"></canvas>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" data-toggle="collapse" data-target="#collapseSix" id="headingSix">
            <h5 class="mb-0">
              <button class="btn btn-link collapsed">
                <span class="formula">$$10n \log (2n)$$</span>
              </button>
            </h5>
          </div>
          <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordion">
            <div class="card-body">
              We need to go further with this chart to see something. Trying to see that it has a time complexity of \(\Theta(n \log n)\) is a bit hard with a chart, as \(\log n\)is REALLY slow, but with a chart going until \(50000\) we are able to see something. With math, we can see that the green-ish line overcomes the purple one at \(x=1024\), but we are unable to see any difference in the chart until something around \(x=10000\). <br/>
              <canvas id="complexity6" class="chartjs" width="undefined" height="undefined"></canvas>
            </div>
          </div>
        </div>
      </div>

<br/>

## Analyzing Sorting Algorithms 🔃

In this first article, we will analyze the basic sorting algorithms: Bubble Sort, Insertion Sort (with its variant) and Shell Sort (with different 'sequences'). All the analysis will be made sorting arrays of unsigned integers, using two languages: C (which will have a better performance, in most cases - although not in all cases) - the chart language - and JavaScript - the playground language. We will analyze the time spent to sort the array, as well as the changes/swaps needed to do it. For Sorted and Reversed arrays, the benchmark was run only once, but to generate the Random data, each data sample was run $$12$$ times or $$2$$ minutes, whichever took less time, so that we were able to make something like an average, to avoid samples where we got a more or less ordered random arrangement of values in the array.

Another point about the random array generation is that its allocation + filling-the-array-with-values time was taken in consideration in the time measure (for sake of comparison it doesn't matter as every sample has that extra "linear" time).

**Disclaimer:** Some weird values can be seen in the sorted array examples, partially because we just ran it once, and it could have been blocked by some OS interruption, taking longer than it would be expected, looking for us as a strange and unexpected curve in the chart.

<br/>

### Bubble Sort 🔁

With a time complexity of $$\Theta(n^2)$$, this algorithm is probably one of the worsts algorithms to sort something (we can find something worst, like [BogoSort](https://en.wikipedia.org/wiki/Bogosort) or [SleepSort 💤 (in Portuguese?)](https://pt.wikipedia.org/wiki/Sleep_sort) , as it takes a LOT of time to organize an array of values, as it compares adjacent pairs of numbers to see if they are in relative order.

It was used arrays varying from $$2^1$$ until $$2^{18}$$ to generate the data below. The left y-axis shows the changes and the right one shows the time. As a reminder, the sorted charts may be a bit wrong in the time dataset, as explained before in this report (TLDR: OS interruptions can cause this).

The code used for it can be seen below, followed by the charts showing the data.

![BubbleSortCode]({{site.baseurl}}/assets/img/sorting-1-bubblesort.png)

<div class='canvas-inside'>
  <canvas id="bubble-1" class="chartjs" width="640" height="400"></canvas>
</div>
<div class='canvas-inside'>
  <canvas id="bubble-2" class="chartjs" width="640" height="400"></canvas>
</div>
<div class='canvas-inside'>
  <canvas id="bubble-3" class="chartjs" width="640" height="400"></canvas>
</div>
<button id="bubbleScale" class='btn btn-primary float-right'>Change scale</button>

<br/><br/>

Some information we can retrieve from these charts is that BubbleSort has best case complexity of $$\Theta(n)$$ as it will only run through the array once, and stop, this is why it only makes $$0$$ changes and has such a small running time (0?).
Reversed case really shows us why he has such an asymptotic curve, going from $$0.82s$$ in the size $$16384$$ to incredible $$177s$$ with a size of $$262144$$ ($$16$$x bigger size, $$256$$x bigger time, as we would expect with a $$\Theta(n^2)$$ complexity). To have some fun, you can try to switch the y-axis scale back and forth between linear and logarithmic scale, to see some difference (the y-axis may be a bit glitched, showing numbers in scientific notation, couldn't figure it out how to make it looks better 🤔).

<br/><br/>

### Insertion Sort ⤵️

Let's move on to another simple sorting algorithm which we all learned in our 1$$^{st}$$ year at CS course. It also has a time complexity of $$\Theta(n^2)$$, but we will be able to see some evolution, comparing to Bubble Sort.

For these charts, we also used arrays varying from $$2^1$$ until $$2^{18}$$ to generate the data below. All blah-blah-blahs spoken about the BubbleSort are also valid here.

The code used for it can be seen below, followed by the charts showing the data.

![InsertionSortCode]({{site.baseurl}}/assets/img/sorting-1-insertionsort.png)

<div class='canvas-inside'>
  <canvas id="insertion-1" class="chartjs" width="640" height="400"></canvas>
</div>
<div class='canvas-inside'>
  <canvas id="insertion-2" class="chartjs" width="640" height="400"></canvas>
</div>
<div class='canvas-inside'>
  <canvas id="insertion-3" class="chartjs" width="640" height="400"></canvas>
</div>
<button id="insertionScale" class='btn btn-primary float-right'>Change scale</button>

<br/><br/>

I really like the Selection Sort idea, it's really a pity that it's $$\Theta(n^2)$$ worst-case complexity 😞. The reversed chart shows us that it makes exactly the same changes as BubbleSort in reverse order, although it took less time, so point to Insertion ✨. In random data, it also runs A LOT faster than Bubble sort (in this sample case, almost 3X faster). So, although both have an average-case time complexity of $$\Theta(n^2)$$, it will only be the same asymptotically, as in "small" samples Insertion can be really faster.

<br/><br/>

### Binary Insertion Sort ⤵️

Now we will have a kind of evolution of the Insertion Sort Algorithm. As we are searching the place to insert our new number, in an already ordered array, it is pretty easy to think about a binary search (maybe one day I could try to implement it with a ternary search - really don't know if it would be faster) to find the exact place where we should insert our number. So, let's see how the thing goes.

Again, arrays size varying from $$2^1$$ until $$2^{18}$$ to generate the data below. I could have used a bigger data sample, because as you will see, this is a bit faster than the last two, but to keep the comparison between them, we used the same data sample.

The code used for it, as well as the code used in the binary search, can be seen below, followed by the charts showing the data.

![BinaryInsertionSortCode]({{site.baseurl}}/assets/img/sorting-1-binaryinsertionsort.png)

<div class='canvas-inside'>
  <canvas id="binary-1" class="chartjs" width="640" height="400"></canvas>
</div>
<div class='canvas-inside'>
  <canvas id="binary-2" class="chartjs" width="640" height="400"></canvas>
</div>
<div class='canvas-inside'>
  <canvas id="binary-3" class="chartjs" width="640" height="400"></canvas>
</div>
<button id="binaryScale" class='btn btn-primary float-right'>Change scale</button>

<br/><br/>

As you can see, the changes occur the exactly same times both in Normal and Binary Insertion. The great advantage comes when we don't need to compare as many times as we would compare in a normal Insertion Sort, because we can find the place we must insert ourselves in $$\log n$$ time, saving us something around 30% of time, although having an average-case time complexity of $$\Theta(n^2)$$, exactly the same as Bubble and Insertion Sort.

<br/><br/>

### Shell Sort ⤵️

Let's start talking about the Shell, thinking about the Insertion. What is it really good about? Sorting ALMOST sorted stuff! And that's what the Shell sort abuses of, making the array each time more "sorted", making it faster to get fully sorted.

It uses something called `sequences` to order different pieces of the array at the same time (you can see "all" of them [here](https://en.wikipedia.org/wiki/Shellsort) (at least, the more famous ones). Here we used three different sequences, as follow:

* Shell Sequence _(1, 2, 4, 8, 16, 32, ...)_
* Knuth Sequence _(1, 4, 13, 40, 121, 364, ...)_
* Tokuda Sequence _(1, 4, 9, 20, 46, 103, ...)_

It is expected that each sequence makes the ShellSort faster (although, as we will see, the last two have just a small difference, not exactly one being better than the other), as they tend to decrease their time-complexity, with the Tokuda Sequence having a time-complexity not yet calculated, but probably better than the Knuth one ( $$O(N^{1+\sqrt{ {8 \ln{(5/2)}} \over {\ln{(N)}} }})$$ - too hard I know).

This time, arrays size will vary from $$2^1$$ until $$2^{28}$$ to generate the data below, to all the sequences.

The code used for it can be seen below, followed by the NINE charts (three for each sequence), showing the data. The gap sequence generation will be omitted for sake of brevity.

![ShellSortCode]({{site.baseurl}}/assets/img/sorting-1-shellsort.png)

<div class='canvas-inside'>
  <canvas id="shell0-1" class="chartjs" width="640" height="400"></canvas>
</div>
<div class='canvas-inside'>
  <canvas id="shell0-2" class="chartjs" width="640" height="400"></canvas>
</div>
<div class='canvas-inside'>
  <canvas id="shell0-3" class="chartjs" width="640" height="400"></canvas>
</div>
<button id="shell0Scale" class='btn btn-primary float-right'>Change scale</button>
<p>
  <br/>
</p>

<div class='canvas-inside'>
  <canvas id="shell1-1" class="chartjs" width="640" height="400"></canvas>
</div>
<div class='canvas-inside'>
  <canvas id="shell1-2" class="chartjs" width="640" height="400"></canvas>
</div>
<div class='canvas-inside'>
  <canvas id="shell1-3" class="chartjs" width="640" height="400"></canvas>
</div>
<button id="shell1Scale" class='btn btn-primary float-right'>Change scale</button>
<p>
  <br/>
</p>

<div class='canvas-inside'>
  <canvas id="shell2-1" class="chartjs" width="640" height="400"></canvas>
</div>
<div class='canvas-inside'>
  <canvas id="shell2-2" class="chartjs" width="640" height="400"></canvas>
</div>
<div class='canvas-inside'>
  <canvas id="shell2-3" class="chartjs" width="640" height="400"></canvas>
</div>
<button id="shell2Scale" class='btn btn-primary float-right'>Change scale</button>

<br/><br/>

Wow, we have a lot of data here! As you can see, ShellSort is pretty BAD at sorting already sorted arrays in comparison to the others sorting algorithms (you can see a comparison in the charts below). That would be easily solved by adding a check to see if it is already sorted (although, it wouldn't solve "almost sorted" arrays long running time). A HUGE improvement can be observed in the last two, as they only take roughly 0.1s to sort the same thing Insertion took 43 seconds!!!!11!.

Weirdly enough, Knuth's and Tokuda's sequences got pretty close not exactly saying which one is better, which is plausible, as Tokuda one doesn't have a time-complexity well-established. Anyway, we will have some comparisons to see that difference better in some charts below.

<br/><br/>

### Conclusion and + Charts 👍

This is over for today! Hope you enjoyed the article, and that it gave you some insights other ones didn't give you, as it took a lot of code and time from me. Wait for similar stuff for the other sorting algorithms! Take a look in the charts below, with some direct comparisons between the different sorting algorithms, remembering that the three $$\Theta(n^2)$$ algorithms only have data until size $$2^{18}$$, while the three Shell ones go up until $$2^{28}$$.

<div class='canvas-inside'>
  <canvas id="sorted" class="chartjs" width="640" height="400"></canvas>
</div>
<button id="sortedScale" class='btn btn-primary float-right'>Change scale</button>
<p>
  <br/>
</p>
<div class='canvas-inside'>
  <canvas id="reversed" class="chartjs" width="640" height="400"></canvas>
</div>
<button id="reversedScale" class='btn btn-primary float-right'>Change scale</button>
<p>
  <br/>
</p>
<div class='canvas-inside'>
  <canvas id="random" class="chartjs" width="640" height="400"></canvas>
</div>
<button id="randomScale" class='btn btn-primary float-right'>Change scale</button>
<p>
  <br/>
</p>
<div class='canvas-inside'>
  <canvas id="shell-random" class="chartjs" width="640" height="400"></canvas>
</div>
<button id="zoomedScale" class='btn btn-primary float-right'>Change scale</button>

<br/><br/><br/>

## Playground ⏳

These algorithms were also "translated" to JavaScript which can be accessed through the table below. The table makes API calls, hosted with the [AWS API Gateway](https://aws.amazon.com/api-gateway/) which uses an [AWS Lambda](https://aws.amazon.com/lambda/) Node.JS runtime to make the calculations (I will make a future post talking about how to configure these stuff), so we can make non-blocking requests. So that I wouldn't be surprised with a big bill on my credit card at the end of the month, the requests to the API are limited to last at most 3 seconds, so you probably won't be able to order 50000 numbers with BubbleSort. As we don't have that much computation power on an AWS machine, the times here will be really slower than the C ones which we used to make the graphics above, but if you run the same code in your machine, you would see that asynchronous Javascript makes the sorting algorithms REALLY faster when using Bubble or Insertion sort, although it makes Shell algorithm slower (we can't process a lot of things at the same time, as we must make all the different sequence values of $$h$$ in strict order). Hope you enjoyed, and see you next time!

<div class="card">
  <div class="card-body">
    <form>
      <div class="form-group">
        <label for="sortingAlgorithm">Sorting Algorithm</label>
        <select class="form-control" id="sortingAlgorithm">
          <option value='bubble-sort'>Bubble Sort</option>
          <option value='insertion-sort'>Insertion Sort</option>
          <option value='binary-insertion-sort'>Binary Insertion Sort</option>
          <option value='shell-sort/0'>Shell Sort - Shell Sequence</option>
          <option value='shell-sort/1'>Shell Sort - Knuth Sequence</option>
          <option value='shell-sort/2'>Shell Sort - Tokuda Sequence</option>
        </select>
      </div>
      <div class="form-group">
        <label for="arrayType">Array Type</label>
        <select class="form-control" id="arrayType">
          <option value='sorted'>Sorted Array</option>
          <option value='reversed'>Reversed Array</option>
          <option value='random'>Random Array</option>
          <option value='custom' selected="selected">Custom Array</option>
        </select>
      </div>
      <div id="arraySizeDiv" class="form-group" style="display: none">
        <label for="arraySize">Array Size</label>
        <input type="text" class="form-control" id="arraySize">
        <small id="arraySizeHelp" class="form-text text-muted">Insert a valid positive number</small>
      </div>
      <div id="customFieldDiv" class="form-group">
        <label id="labelCustomField" for="customField">Custom field</label>
        <input type="text" class="form-control" id="customField" placeholder="1 2 3 4">
        <small id="customFieldHelp" class="form-text text-muted">Insert numbers with a space between them</small>
      </div>
      <button id="submitButton" type="submit" class="btn btn-primary">Go</button>
    </form>
    <hr />
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Sorting Algorithm</th>
            <th scope="col">Array Type</th>
            <th scope="col">Array Size</th>
            <th scope="col">Time</th>
            <th scope="col">Changes</th>
          </tr>
        </thead>
        <tbody id="playgroundTable">
          <tr id="information">
            <td></td>
            <td colspan="5">Nothing here yet, you should make requests there, so that I can show u smth ⬆️</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button id="resetTable" class="btn btn-primary float-right">Reset Table</button>
  </div>
</div>

<br/><br/>

> This article was first written as a report for the Data Search & Classification 📊 Subject at the CS Bsc. course at [UFRGS](http://ufrgs.br), and adapted to this blog post. You can find the original post with the API running on a Node.JS backend (some order of magnitude faster than this one up here) on [this repository tag](https://github.com/rafaeelaudibert/LaboratoriosCPD.js/tree/nodeJS) on my Github.
