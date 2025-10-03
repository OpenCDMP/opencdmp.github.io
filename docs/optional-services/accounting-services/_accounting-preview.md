
<!-- accounting disabled if you want to activate and rename file name to accounting-preview.md 
sidebar_position: 1
description: Discover everything about the Accounting service
---

# Accounting Preview
This filter panel allows users to query and retrieve usage data by customizing parameters before making an API call. It serves as the primary interface for refining and extracting detailed accounting or activity metrics based on specific criteria. The data returned can then be previewed or exported as a CSV file.

![accounting](/images/accounting/accounting-filters.png)

:::note
The **My Accounting** view is scoped to the currently logged-in user and displays only their personal usage data (e.g., their actions, uploads, and interactions within the platform).

In contrast, the **Service** is an administrative tool that provides access to platform-wide metrics. It is intended for admins, who can view and analyze data across **all users** and services for monitoring and reporting purposes.
:::


## User actions

Let's explore these actions and what privileges they require.

- **Group By**: Defines how the results should be grouped (e.g., by Service, Resource, Action, User). This determines the aggregation level of the data.

- **Calculation**: Specifies the type of calculation to perform on the data (e.g., Sum, Average, Max, Min). It may be optional depending on the context.

- **Measure**: Indicates the specific metric to be analyzed (e.g., Time, Information, Throughput, Unit).

- **Date Interval**: Defines how the time range is split (e.g., Hour, Day, Month, Year) for time-based analysis. *This is optional.*

- **Date Range**: Sets the start and end date for the data query.

## Additional Optional Filtering Options

- **Service**: Filter to choose a service. *This is optional.*

- **Resources**: Include only specific resources in the query. *This is optional.*

- **Actions**: Filter by specific actions performed within the platform. Click [here](optional-services/accounting-services/index.md#metrics) to see the values of action. *This is optional.*

- **Users**: Filter results to only include data from selected users. *This is optional.*

- **Excluded Resources**: Explicitly exclude selected resources from the query. *This is optional.*

- **Excluded Actions**: Exclude specific actions to narrow down the results. *This is optional.*

- **Excluded Users**: Exclude specific users from the results. *This is optional.*

## Chart Display
When a Date Interval is selected and the Preview button is clicked, the system generates a chart displaying the queried metric over time.
The chart provides a visual representation of the data, helping users analyze trends, peaks, or drops across the selected date range. This makes it easier to interpret how different metrics evolve over time and supports better decision-making.

## Actions

- **Reset**: Clears all selected filters and returns the panel to its default state.

- **Preview**: Allows users to preview the filtered data (disabled until all required fields are filled).

- **Download CSV**: Enables users to download the results as a CSV file for offline analysis (also disabled until a preview is available).  -->
