#!/usr/bin/env python2

# This Python scripts reads DOT on-time arrival csvs and creates
# statistics of flights being delayed by:
# - Day of week
# - Day of month
# - Month of year

import csv
import sys
import copy

# Minimum number of delay for this flight to be considred as delayed
MinDelayedFlightMin = 15


# Single day statistics (number of flights, number of delayed flights, percentage delayed)
Stats = { 'Total' : 0, 'TotalDelayed' : 0, 'PercentDelayed' : 0 }


def UpdateSingleStats(d, IsDelayed):
	d['Total'] += 1
	if IsDelayed:
		d['TotalDelayed'] += 1
	d['PercentDelayed'] = float(d['TotalDelayed']) / d['Total']
	return d

#
# main
#

# Day of week statistics
DayOfWeek = [None] * 7
for i in range(7):
	DayOfWeek[i] = copy.copy(Stats)

# Day of month statistics
DayOfMonth = [None] * 31
for i in range(31):
	DayOfMonth[i] = copy.copy(Stats)

# Month of year statistics
MonthOfYear = [None] * 12
for i in range(12):
	MonthOfYear[i] = copy.copy(Stats)


#
# Main
#
for arg in sys.argv[1:]:
	with open(arg) as csvfile:
		print('Processing ' + arg + '...')
		reader = csv.DictReader(csvfile)
		for row in reader:

			# Skip flights without delay information
			if row['ARR_DELAY'] == '':
				continue

			# Update the stats
			IsDelayed = eval(row['ARR_DELAY']) > 15
			dow = int(row['DAY_OF_WEEK'])-1
			dom = int(row['DAY_OF_MONTH'])-1
			m = int(row['MONTH'])-1
			DayOfWeek[dow]  = UpdateSingleStats(DayOfWeek[dow], IsDelayed)
			DayOfMonth[dom] = UpdateSingleStats(DayOfMonth[dom], IsDelayed)
			MonthOfYear[m]  = UpdateSingleStats(MonthOfYear[m], IsDelayed)


#
# Write the resulted stats, translate using a lookup table if provided
#

def WritePercentDelayedStats(csvfile, FirstColumnHeader, l, lookupTable = ''):
	#
	# Read lookup table (if provided)
	#
	lookupData =''
	if lookupTable != '':
		with open(lookupTable) as f:
			reader = csv.DictReader(f)
			lookupData = list(reader)

	#
	# Write the stats
	#
	writer = csv.DictWriter(csvfile, [FirstColumnHeader, 'PercentDelayed'])
	writer.writeheader()
	for i in range(len(l)):
		# Use the lookup to replace values
		keyValue = str(i + 1)
		if lookupData != '':
			for row in lookupData:
				if row['Code'] == keyValue:
					keyValue = row['Description']
					break
		# Write the row to the ouput file
		writer.writerow({FirstColumnHeader: keyValue, 'PercentDelayed' : l[i]['PercentDelayed']})

# Write results
WritePercentDelayedStats(open('DayOfWeek.csv', 'w'), 'DayOfWeek', DayOfWeek, 'L_WEEKDAYS.csv')
WritePercentDelayedStats(open('DayOfMonth.csv', 'w'), 'DayOfMonth', DayOfMonth)
WritePercentDelayedStats(open('MonthOfYear.csv', 'w'), 'MonthOfYear', MonthOfYear, 'L_MONTHS.csv')

