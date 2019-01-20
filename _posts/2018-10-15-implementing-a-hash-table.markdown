---
layout: post
title:  Implementing a Hash Table
series: Sorting [3/3]
date:   2018-10-15 12:00:00 +0300
description: >
 Third and last post of a series about Sorting Algorithms
img: sorting-3-main.jpg # Add image post (optional)
tags: [Computer, Sorting, Efficiency, HashTable, Dictionaries, UFRGS, C, JavaScript]
main_tags: [Dictionaries, HashTable, JavaScript]
js-files: [hash.js, sorting-3.js]
author: Rafael Audibert # Add name author (optional)
---

This is the third article, in a series of 3, on which we will talk about Sorting Algorithms with tons of charts. In this one, we will actually not speak about a sorting algorithm, I am sorry, but about hashing algorithms which will makes us able to build a Hash Table (think about a `dictionary` on Python). These kind of algorithms allow us to retrieve some data with an alphanumeric key, instead of numeric key, like we would do with an array. You will be able to experiment it in the bottom of the page, adding information to the hash, and seeing if it is available or not with an incredible $$\Theta(1)$$ time complexity.

> This time, the JavaScript code will run in your own browser, as the Hash Table is size-limited to 1009 slots, so it won't eat all of your memory.

<br/>

## Introduction 🔃

Hash is an incredible tool to acess information through an alphanumeric key (can be extended to more types of keys, but only alphanumerics one will be covered in this report). It is natively implemented in most of the high level languages (`dictionaries` in Python, `normal objects` in JavaScript) and even some implementation in kinda low-level languages (such as the `map` data structure in C++). Which is pretty awesome is that it has an $$\Theta(1)$$ time complexity, which means that no matter how many data are in the Hash Table, we can acess any value with a constant time.
        
<br />

## Hashing functions 🔃

In the texts/codes below, when we talk about hashing functions we are talking about the function which we pass a string and it returns us a key which will be used to acess the hash table. For this code, we used 2 differents hashing functions, as can be seen in the code below. The first one is the primary one, while the second one is used with the rehashing algorithm, which will be explained below.

![Hash1Code]({{site.baseurl}}/assets/img/sorting-3-hash1.png)

![Hash2Code]({{site.baseurl}}/assets/img/sorting-3-hash2.png)

<br/>

### Analyzing hashing algorithms 🔃

Three types of hashing algorithms will be used, divided in two categories: Open and Closed Hashing. Talking about Open Hashing we will have the Linear Search algorithm, which tries to verify the next position of the Hash Table, if the actual is already filled, and the Rehashing Algorithm, which has an increment calculated through another hashing function, trying to minimize the conflicts. The closed hashing algorithm used is the Listing Algorithm, which creates a list in each of the possible hashed key values instead of trying to find another place to insert it. In the chart below we can see the comparison between the three. They were tested against <a href="dataset.txt">this</a> names database when
inserting, and <a href="queries.txt">this</a> names when searching, varying the table size, and the data shown is the quantity of colision in the insertion.

<div class='canvas-inside'>
  <canvas id="hash-1" class="chartjs" width="640" height="400"></canvas>
</div>

<br/><br/>

## Playground ⏳

This time we only made JavaScript code, as it would be kinda hard to deal with strings in C. You can test the rehashing algorithm below. Make some exploration and discover what you can do with it. By default, the table has roughly 1000 spaces, so don't insert too much 'cause it may crash as I didn't totally handled when the HashTable is full to be able to resize it. Hope you enjoyed it again, and see you next post!

<div class="card">
  <div class="card-body">
    <h3> Hash Table<br /></h3>
    <form>
      <div class="form-group">
        <label for="key">Key(s)</label>
        <textarea type="text" class="form-control" rows="5" id="key"></textarea>
        <small id="keyHelp" class="form-text text-muted">Insert alphanumeric key values in each line</small>
      </div>
      <div class="form-group">
        <label for="data">Value(s)</label>
        <textarea type="text" class="form-control" rows="5" id="data"></textarea>
        <small id="dataHelp" class="form-text text-muted">Insert alphanumeric data values in each line</small>
      </div>
      <button id="insertButton" type="submit" class="btn btn-primary left">Insert Key(s)/Value(s)</button>
      <button id="retrieveButton" type="submit" class="btn btn-primary left">Retrieve Value(s)</button>
      <button id="resetButton" type="submit" class="btn btn-primary right">Reset HashTable</button>
    </form>
    <hr />
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Insertion or Search?</th>
            <th scope="col">Key</th>
            <th scope="col">Data</th>
            <th scope="col">Conflicts</th>
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
    <button id="clearTable" class="btn btn-primary float-right">Clear Table</button>
  </div>
</div>

<br/>

> This article was first written as a report for the Data Search & Classification 📊 Subject at the CS Bsc. course at [UFRGS](http://ufrgs.br), and adapted to this blog post. You can find the original post with the API running on a Node.JS backend (some order of magnitudes faster than this one up here) on [this repository tag](https://github.com/rafaeelaudibert/LaboratoriosCPD.js/tree/nodeJS) on my Github.