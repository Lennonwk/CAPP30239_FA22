import csv
import pandas as pd

# Visualization 1: Fertility Rate Change 1990-2020

# Read in csv
fertility_df = pd.read_csv("fertility_rate_cleaned_v1.csv")

def country_rate_change(df):
    '''
    Iterates through dataframe, subtracts country's 1970 fertility rate from
    2020 fertility rate and returns country name and fetility rate change
    '''
    country_rate_change_dict = {}
    country_rate_change_list = []
    for row in df.iterrows():
        country = row[1][0]
        rate = row[1][2]
        # if country not in country_rate_change_list:
            # country_rate_change_list.append([country, rate ])
        if country in country_rate_change_dict:
            country_rate_change_dict[country] = row[1][2] - country_rate_change_dict[country]
        if country not in country_rate_change_dict:
            country_rate_change_dict[country] = row[1][2]
    for country, rate in country_rate_change_dict.items():
        country_rate_change_list.append([country, rate])
    return country_rate_change_list

'''
with open('fertility_rate_cleaned_final.csv', 'w', encoding='UTF8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    writer.writerows(country_rate_change_list)
'''

# Visualization 3 Worker to Retiree Ratio

# Read in data frame:
work_ratio_df = pd.read_csv("worker_ratio_cleaned_v1.csv")


def worker_retiree_ratio(df):
    '''
    Iterates through dataframe, creates country / 1990 ratio / 2020 ratio/
    2050 ratio columns
    '''
    worker_ratio_dict = {}
    worker_ratio_list = []
    for row in df.iterrows():
        country = row[1][0]
        year = row[1][1]
        age_range = row[1][2]
        population = row[1][3]
        if country in worker_ratio_dict: 
            if age_range in worker_ratio_dict[country]:
                worker_ratio_dict[country][age_range][year] = population
            if age_range not in worker_ratio_dict[country]:
                worker_ratio_dict[country][age_range] = {year: population}
        if country not in worker_ratio_dict:
            worker_ratio_dict[country] = {age_range: {year: population }}
    worker_ratio_list =\
        [['Australia', 
        worker_ratio_dict['Australia']['20-64'][1990]/worker_ratio_dict['Australia']['65+'][1990], 
        worker_ratio_dict['Australia']['20-64'][2020]/worker_ratio_dict['Australia']['65+'][2020],
        worker_ratio_dict['Australia']['20-64'][2050]/worker_ratio_dict['Australia']['65+'][2050]],
        ['Brazil', 
        worker_ratio_dict['Brazil']['20-64'][1990]/worker_ratio_dict['Brazil']['65+'][1990], 
        worker_ratio_dict['Brazil']['20-64'][2020]/worker_ratio_dict['Brazil']['65+'][2020],
        worker_ratio_dict['Brazil']['20-64'][2050]/worker_ratio_dict['Brazil']['65+'][2050]],
        ['Canada', 
        worker_ratio_dict['Canada']['20-64'][1990]/worker_ratio_dict['Canada']['65+'][1990], 
        worker_ratio_dict['Canada']['20-64'][2020]/worker_ratio_dict['Canada']['65+'][2020],
        worker_ratio_dict['Canada']['20-64'][2050]/worker_ratio_dict['Canada']['65+'][2050]],
        ['China', 
        worker_ratio_dict['China']['20-64'][1990]/worker_ratio_dict['China']['65+'][1990], 
        worker_ratio_dict['China']['20-64'][2020]/worker_ratio_dict['China']['65+'][2020],
        worker_ratio_dict['China']['20-64'][2050]/worker_ratio_dict['China']['65+'][2050]],
        ['France', 
        worker_ratio_dict['France']['20-64'][1990]/worker_ratio_dict['France']['65+'][1990], 
        worker_ratio_dict['France']['20-64'][2020]/worker_ratio_dict['France']['65+'][2020],
        worker_ratio_dict['France']['20-64'][2050]/worker_ratio_dict['France']['65+'][2050]],
        ['Germany', 
        worker_ratio_dict['Germany']['20-64'][1990]/worker_ratio_dict['Germany']['65+'][1990], 
        worker_ratio_dict['Germany']['20-64'][2020]/worker_ratio_dict['Germany']['65+'][2020],
        worker_ratio_dict['Germany']['20-64'][2050]/worker_ratio_dict['Germany']['65+'][2050]],
        ['India', 
        worker_ratio_dict['India']['20-64'][1990]/worker_ratio_dict['India']['65+'][1990], 
        worker_ratio_dict['India']['20-64'][2020]/worker_ratio_dict['India']['65+'][2020],
        worker_ratio_dict['India']['20-64'][2050]/worker_ratio_dict['India']['65+'][2050]],
        ['Italy', 
        worker_ratio_dict['Italy']['20-64'][1990]/worker_ratio_dict['Italy']['65+'][1990], 
        worker_ratio_dict['Italy']['20-64'][2020]/worker_ratio_dict['Italy']['65+'][2020],
        worker_ratio_dict['Italy']['20-64'][2050]/worker_ratio_dict['Italy']['65+'][2050]],
        ['Japan', 
        worker_ratio_dict['Japan']['20-64'][1990]/worker_ratio_dict['Japan']['65+'][1990], 
        worker_ratio_dict['Japan']['20-64'][2020]/worker_ratio_dict['Japan']['65+'][2020],
        worker_ratio_dict['Japan']['20-64'][2050]/worker_ratio_dict['Japan']['65+'][2050]],
        ["Dem. People's Rep. of Korea", 
        worker_ratio_dict["Dem. People's Rep. of Korea"]['20-64'][1990]/worker_ratio_dict["Dem. People's Rep. of Korea"]['65+'][1990], 
        worker_ratio_dict["Dem. People's Rep. of Korea"]['20-64'][2020]/worker_ratio_dict["Dem. People's Rep. of Korea"]['65+'][2020],
        worker_ratio_dict["Dem. People's Rep. of Korea"]['20-64'][2050]/worker_ratio_dict["Dem. People's Rep. of Korea"]['65+'][2050]],
        ['Russian Federation', 
        worker_ratio_dict['Russian Federation']['20-64'][1990]/worker_ratio_dict['Russian Federation']['65+'][1990], 
        worker_ratio_dict['Russian Federation']['20-64'][2020]/worker_ratio_dict['Russian Federation']['65+'][2020],
        worker_ratio_dict['Russian Federation']['20-64'][2050]/worker_ratio_dict['Russian Federation']['65+'][2050]],
        ['United Kingdom', 
        worker_ratio_dict['United Kingdom']['20-64'][1990]/worker_ratio_dict['United Kingdom']['65+'][1990], 
        worker_ratio_dict['United Kingdom']['20-64'][2020]/worker_ratio_dict['United Kingdom']['65+'][2020],
        worker_ratio_dict['United Kingdom']['20-64'][2050]/worker_ratio_dict['United Kingdom']['65+'][2050]],
        ['United States of America', 
        worker_ratio_dict['United States of America']['20-64'][1990]/worker_ratio_dict['United States of America']['65+'][1990], 
        worker_ratio_dict['United States of America']['20-64'][2020]/worker_ratio_dict['United States of America']['65+'][2020],
        worker_ratio_dict['United States of America']['20-64'][2050]/worker_ratio_dict['United States of America']['65+'][2050]]
        ]
    return worker_ratio_list

    '''
    with open('worker_ratio_cleaned_final.csv', 'w', encoding='UTF8', newline='') as f:
     ...:     writer = csv.writer(f)
     ...:     writer.writerow(header)
     ...:     writer.writerows(data)
     
     '''
        

