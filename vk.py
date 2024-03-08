'''import pandas as pd


train_data = pd.read_csv('trainee_train.csv')
print(train_data.head())

test_data = pd.read_csv('trainee_test_fish.csv')
print(test_data.head())

print(train_data.columns)

from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(train_data[['feature_1', 'feature_2', 'feature_3']], train_data['target'])
predictions = model.predict(test_data)
predictions_df = pd.DataFrame({'target': predictions})
predictions_df.to_csv('predictions.csv', index=False)'''

import pandas as pd
from sklearn.linear_model import LinearRegression
train_data = pd.read_csv('trainee_train.csv')
test_data = pd.read_csv('trainee_test_fish.csv')
model = LinearRegression()
model.fit(train_data[['feature_1', 'feature_2', 'feature_3']], train_data['target'])
predictions = model.predict(test_data[['feature_1', 'feature_2', 'feature_3']])
predictions_df = pd.DataFrame({'target': predictions})
predictions_df.to_csv('predictions.csv', index=False)
