## Introduction
This folder contains Jupyter Notebooks used for quantitative analysis performed on the data we collected through our two-part survey. Figures and numbers produced by those Jupyter Notebooks were part of our paper.

### Packages Used:
* `pandas` - The `pandas` library was used to import `.csv` files, which contain our data, into Jupyter Notebooks for processing and graph making.
* `matplotlib` - The `matplotlib` library was used to create figures used during analysis and in the paper.
    * `matplotlib.pyplot` - The `pyplot` module was used to create figures and control figures' size and arrangements.
    * `matplotlib.ticker` - The `ticker` module was used to customize ticks (format) on both `x` and `y` axes of figures.
    * `matplotlib.ticker.MaxNLocator` - The `MaxNLocator` class was used to set the type of data presented on axes of figures.

### File Structure:
* `Demographic_Processing.ipynb` - Aggregated demographics data from the survey and was used to create the demographics table in the paper.
* `Platform_Selection.ipynb` - Processed response from the survey question on where participants would use five-word passwords and produced Figure 8 in the paper.
* `Recall_Graph.ipynb` - Processed recall data from the survey and produced Figure 6 in the paper.
* `S9_S14_Q7_Q9.ipynb` - Processed data from four survey questions and produced Figures 7, 9 and 10 in the paper.
* `Word_Frequency_Graph.ipynb` - Aggregated data on frequency of words in participant generated five-word passwords and produced Figures 4 and 5 in the paper.