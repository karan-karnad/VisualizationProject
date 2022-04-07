from flask import Flask

app = Flask(__name__)

@app.route('/api',methods=['GET'])
def index():
    return { 'name' : 'Hello world!'}

if __name__ == '__main':
    app.run(debug=True)


AvgTest.tmp: Avg.py AvgTest.py
		coverage run --branch AvgTest.py > AvgTest.tmp 2>&1
		coverage report -m                   >> AvgTest.tmp
		cat AvgTest.tmp