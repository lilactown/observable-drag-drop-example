import {run} from './libs/run';

// App
import {model} from './model';
import {view} from './view';
import {intent} from './intents';


const DOMNode = document.getElementById('app');
run(view(model(intent)), DOMNode);
