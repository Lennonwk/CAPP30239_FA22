import pandas as pd 
import json
import csv
import time
  
# Opening JSON file
##data = open('/Users/williamlennon/Documents/UChicago/Courses/CAPP 30239 Data Visualization/CAPP30239_FA22/week_06/a3cleanedonly2015.json')

# Read in / create the pandas dataframe with police shooting dataset
df = pd.read_json('/Users/williamlennon/Documents/UChicago/Courses/CAPP 30239 Data Visualization/CAPP30239_FA22/week_06/a3cleanedonly2015.json')
  
# Return / print the first 10 rows with headers
df10 = df[:10]

# Visualization 1: Multi-Line Chart with total deaths and deaths from highest 5 states
# from time import strptime
def deaths_by_month(df):
    '''
    
    '''
    Total_count_Jan = 0
    Total_count_Feb = 0
    Total_count_Mar = 0
    Total_count_Apr = 0
    Total_count_May = 0
    Total_count_Jun = 0
    Total_count_Jul = 0
    Total_count_Aug = 0
    Total_count_Sep = 0
    Total_count_Oct = 0
    Total_count_Nov = 0
    Total_count_Dec = 0
    TX_count_Jan = 0
    TX_count_Feb = 0
    TX_count_Mar = 0
    TX_count_Apr = 0
    TX_count_May = 0
    TX_count_Jun = 0
    TX_count_Jul = 0
    TX_count_Aug = 0
    TX_count_Sep = 0
    TX_count_Oct = 0
    TX_count_Nov = 0
    TX_count_Dec = 0
    CA_count_Jan = 0
    CA_count_Feb = 0
    CA_count_Mar = 0
    CA_count_Apr = 0
    CA_count_May = 0
    CA_count_Jun = 0
    CA_count_Jul = 0
    CA_count_Aug = 0
    CA_count_Sep = 0
    CA_count_Oct = 0
    CA_count_Nov = 0
    CA_count_Dec = 0
    FL_count_Jan = 0
    FL_count_Feb = 0
    FL_count_Mar = 0
    FL_count_Apr = 0
    FL_count_May = 0
    FL_count_Jun = 0
    FL_count_Jul = 0
    FL_count_Aug = 0
    FL_count_Sep = 0
    FL_count_Oct = 0
    FL_count_Nov = 0
    FL_count_Dec = 0
    for d in df.iterrows():
        month = time.strftime("%m",  time.strptime(str(d[1][7]), "%Y-%m-%d %H:%M:%S"))
        if month == '01':
            Total_count_Jan += 1
        if month == '02':
            Total_count_Feb += 1
        if month == '03':
            Total_count_Mar += 1
        if month == '04':
            Total_count_Apr += 1
        if month == '05':
            Total_count_May += 1
        if month == '06':
            Total_count_Jun += 1
        if month == '07':
            Total_count_Jul += 1
        if month == '08':
            Total_count_Aug += 1
        if month == '09':
            Total_count_Sep += 1
        if month == '10':
            Total_count_Oct += 1
        if month == '11':
            Total_count_Nov += 1
        if month == '12':
            Total_count_Dec += 1
        if d[1][9] == 'TX':
            if month == '01':
                TX_count_Jan += 1
            if month == '02':
                TX_count_Feb += 1
            if month == '03':
                TX_count_Mar += 1
            if month == '04':
                TX_count_Apr += 1
            if month == '05':
                TX_count_May += 1
            if month == '06':
                TX_count_Jun += 1
            if month == '07':
                TX_count_Jul += 1
            if month == '08':
                TX_count_Aug += 1
            if month == '09':
                TX_count_Sep += 1
            if month == '10':
                TX_count_Oct += 1
            if month == '11':
                TX_count_Nov += 1
            if month == '12':
                TX_count_Dec += 1
        if d[1][9] == 'CA':
            if month == '01':
                CA_count_Jan += 1
            if month == '02':
                CA_count_Feb += 1
            if month == '03':
                CA_count_Mar += 1
            if month == '04':
                CA_count_Apr += 1
            if month == '05':
                CA_count_May += 1
            if month == '06':
                CA_count_Jun += 1
            if month == '07':
                CA_count_Jul += 1
            if month == '08':
                CA_count_Aug += 1
            if month == '09':
                CA_count_Sep += 1
            if month == '10':
                CA_count_Oct += 1
            if month == '11':
                CA_count_Nov += 1
            if month == '12':
                CA_count_Dec += 1
        if d[1][9] == 'FL':
            if month == '01':
                FL_count_Jan += 1
            if month == '02':
                FL_count_Feb += 1
            if month == '03':
                FL_count_Mar += 1
            if month == '04':
                FL_count_Apr += 1
            if month == '05':
                FL_count_May += 1
            if month == '06':
                FL_count_Jun += 1
            if month == '07':
                FL_count_Jul += 1
            if month == '08':
                FL_count_Aug += 1
            if month == '09':
                FL_count_Sep += 1
            if month == '10':
                FL_count_Oct += 1
            if month == '11':
                FL_count_Nov += 1
            if month == '12':
                FL_count_Dec += 1
    print('Jan:', Total_count_Jan)
    print('Feb:', Total_count_Feb)
    print('Mar:', Total_count_Mar)
    print('Apr:', Total_count_Apr)
    print('May:', Total_count_May)
    print('Jun:', Total_count_Jun)
    print('Jul:', Total_count_Jul)
    print('Aug:', Total_count_Aug)
    print('Sep:', Total_count_Sep)
    print('Oct:', Total_count_Oct)
    print('Nov:', Total_count_Nov)
    print('Dec:', Total_count_Dec)
    print('TX Jan:', TX_count_Jan)
    print('TX Feb:', TX_count_Feb)
    print('TX Mar:', TX_count_Mar)
    print('TX Apr:', TX_count_Apr)
    print('TX May:', TX_count_May)
    print('TX Jun:', TX_count_Jun)
    print('TX Jul:', TX_count_Jul)
    print('TX Aug:', TX_count_Aug)
    print('TX Sep:', TX_count_Sep)
    print('TX Oct:', TX_count_Oct)
    print('TX Nov:', TX_count_Nov)
    print('TX Dec:', TX_count_Dec)
    print('CA Jan:', CA_count_Jan)
    print('CA Feb:', CA_count_Feb)
    print('CA Mar:', CA_count_Mar)
    print('CA Apr:', CA_count_Apr)
    print('CA May:', CA_count_May)
    print('CA Jun:', CA_count_Jun)
    print('CA Jul:', CA_count_Jul)
    print('CA Aug:', CA_count_Aug)
    print('CA Sep:', CA_count_Sep)
    print('CA Oct:', CA_count_Oct)
    print('CA Nov:', CA_count_Nov)
    print('CA Dec:', CA_count_Dec)
    print('FL Jan:', FL_count_Jan)
    print('FL Feb:', FL_count_Feb)
    print('FL Mar:', FL_count_Mar)
    print('FL Apr:', FL_count_Apr)
    print('FL May:', FL_count_May)
    print('FL Jun:', FL_count_Jun)
    print('FL Jul:', FL_count_Jul)
    print('FL Aug:', FL_count_Aug)
    print('FL Sep:', FL_count_Sep)
    print('FL Oct:', FL_count_Oct)
    print('FL Nov:', FL_count_Nov)
    print('FL Dec:', FL_count_Dec)

# Create a csv of the specific data to be used for Viz #1
header = ['State', 'Date', 'Deaths']
data = [
    ['California',1,12],
    ['California',2 ,14 ],
    ['California',3 ,34 ],
    ['California',4 ,28 ],
    ['California',5 ,12 ],
    ['California',6 ,13 ],
    ['California',7 ,30 ],
    ['California',8 ,24 ],
    ['California',9 ,28 ],
    ['California',10 ,28 ],
    ['California',11 , 23 ],
    ['California',12 ,30 ],
    ['Texas',1 ,26 ],
    ['Texas',2 ,16 ],
    ['Texas',3 ,6 ],
    ['Texas',4 ,14 ],
    ['Texas',5 ,19 ],
    ['Texas',6 ,20 ],
    ['Texas',7 ,15 ],
    ['Texas',8 ,18 ],
    ['Texas',9 ,10 ],
    ['Texas',10 ,13 ],
    ['Texas',11 ,10 ],
    ['Texas',12 ,8 ],
    ['Florida',1,2 ],
    ['Florida',2 ,9 ],
    ['Florida',3 ,9 ],
    ['Florida',4 ,8 ],
    ['Florida',5 ,10 ],
    ['Florida',6 ,7 ],
    ['Florida',7 ,10 ],
    ['Florida',8 ,5 ],
    ['Florida',9 ,10 ],
    ['Florida',10 ,10 ],
    ['Florida',11 ,5 ],
    ['Florida',12 ,6 ]   
    ]
with open('deaths_by_month.csv', 'w', encoding='UTF8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    writer.writerows(data)


# Visualization 3: Stacked Bar Chart of deaths per age group and gender

def deaths_by_age_gender(df):
    '''
    Function counts the number of deaths for each age and gender category.
    '''
    # count_under18_male = 0
    #count_under18_female = 0
    # count_18_24_male = 0
    # count_18_24_female = 0
    # count_25_29_male = 0
    # count_25_29_female = 0
    count_under20_male = 0
    count_under20_female = 0
    count_20_29_male = 0
    count_20_29_female = 0
    count_30_39_male = 0
    count_30_39_female = 0
    count_40_49_male = 0
    count_40_49_female = 0
    count_50_59_male = 0
    count_50_59_female = 0
    count_over60_male = 0
    count_over60_female = 0
    for d in df.iterrows():
        age = d[1][4]
        gender = d[1][5]
        # if age < 19 and gender == 'Male':
            # count_under18_male += 1
        # if age > 19 and gender == 'Female':
            # count_under18_male += 1
        # if age > 18 and age < 25 and gender == 'Male':
            # count_18_24_male += 1
        # if age > 18 and age < 25 and gender == 'Female':
            # count_18_24_female += 1
        # if age > 24 and age < 30 and gender == 'Male':
            # count_25_29_male += 1
        # if age > 24 and age < 30 and gender == 'Female':
            # count_25_29_female += 1
        if age > 19 and age < 30 and gender == 'Male':
            count_20_29_male += 1
        if age > 19 and age < 30 and gender == 'Female':
            count_20_29_female += 1
        if age < 20 and gender == 'Male':
            count_under20_male += 1
        if age > 20 and gender == 'Female':
            count_under20_female += 1
        if age > 29 and age < 40 and gender == 'Male':
            count_30_39_male += 1
        if age > 29 and age < 40 and gender == 'Female':
            count_30_39_female += 1
        if age > 39 and age < 50 and gender == 'Male':
            count_40_49_male += 1
        if age > 39 and age < 50 and gender == 'Female':
            count_40_49_female += 1
        if age > 49 and age < 60 and gender == 'Male':
            count_50_59_male += 1
        if age > 49 and age < 60 and gender == 'Female':
            count_50_59_female += 1
        if age > 59 and gender == 'Male':
            count_over60_male += 1
        if age > 59 and gender == 'Female':
            count_over60_female += 1
    print('count_under20_male', count_under20_male)
    print('count_under20_female', count_under20_female)
    print('count_20_29_male', count_20_29_male)
    print('count_20_29_female', count_20_29_female)
    print('count_30_39_male', count_30_39_male)
    print('count_30_39_female', count_30_39_female)
    print('count_40_49_male', count_40_49_male)
    print('count_40_49_female', count_40_49_female)
    print('count_50_59_male', count_50_59_male)
    print('count_50_59_female', count_50_59_female)
    print('count_over60_male', count_over60_male)
    print('count_over60_female', count_over60_female)

# Create a json file for specific data to be used for Viz #2

df['Race'].value_counts()
df['Armed'].value_counts()

[
  {
    "attribute": "Race",
    "values": [
      {
        "category": "White",
        "amount": 751
      },
      {
        "category": "Black",
        "amount": 378
      },
      {
        "category": "Hispanic",
        "amount": 246
      },
      {
        "category": "Other",
        "amount": 152
      }
    ]
  },
  {
    "attribute": "Armed",
    "values": [
      {
        "category": "Gun",
        "amount": 683
      },
      {
        "category": "Knife",
        "amount": 171
      },
      {
        "category": "Unarmed",
        "amount": 56
      },
      {
        "category": "Unreported",
        "amount": 533
      }
    ]
  }
]




# Create a csv of the specific data to be used for Viz #3
header = ['group', 'Male Deaths', 'Female Deaths']
data = [
    ['Under 20', 68, 63],
    ['20-29', 437, 17],
    ['30-39', 414, 20],
    ['40-49', 274, 15],
    ['50-59', 182, 10], 
    ['60+', 81, 2]
]
with open('deaths_by_month.csv', 'w', encoding='UTF8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    writer.writerows(data)