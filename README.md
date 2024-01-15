# m

```
const m = require('./m.js')
```
Just a collection of simple tools helpful in the debugging and develoment process. 

Whenever I develop a small utility that I find myself using frequently, I add it to this library. The collection expands with an attempt to maintain retrocompatibility.

<details>
<summary><big>commands (<i>prompt handler</i>)</big></summary>

> Tought to assist in the debugging and development process, this list of properties enables users to interact with the program through terminal prompts.
> By utilizing the command feature, you can define a callback that will be executed when the user types something in the terminal. These callbacks are organized into sets known as "phases," where each phase corresponds to a specific behavior of the program.
> Starting with the `default` phase, user can create new phases and switch between them



### command(input, callback)
Set a response to a given input and store it in the current phase. At the beginning, the current phase is "default".

### remove(input)
Delete the callback linked to "input"

### unknown(callback)
Set the function to execute when an unknown input line is received, in the current phase. Returns `true/false`


### swap(newPhase, unknownCallback)
Set the current phase to newPhase. If it doesn't exist, it will be created. In the latter case, you may provide a "unknown" callback.

### start()
start reading terminal inputs

### stop()

</details>


<details>
<summary><big> console logging</big></summary>

> using m.log instead of "console.log", you can activate and deactivate your printing statement as you can see in the following examples. I make extensive use of it for debugging purposes.


### start/stop

```
m.log('this will show up')
m.stopLog()
m.log('this won t show up')

m.startLog()
m.log('this will show up again')

```

### other methods:
+ setConsolePrefix : add a prefix to every console output
+ getConsolePrefix 
+ lthen : console.log with a "then" prefix
+ lcatch : console.log with a "catch" prefix


</details>

<details>
<summary><big>file logging</big></summary>

> A small utility that is used to append text strings to a file.


### setLogFile(fileName, withDate, currentDirectory) 

set the name of the file. "absolutePath" defaults to false.

### start/stop
```
m.startFileLog()
m.log('this will show up')

m.stopFileLog()
m.log('this won t show up')

```

### other methods:
+ setFilePrefix : add a prefix to every line in the log
+ getFilePrefix 




</details>
<details>
<summary><big>functions</big></summary>
Particularly usefull in conjunction with TAGS

### setFunc(fname, f)

it stores a functions with function name 'fname' and code f

### func(fname, args)
it calls a functions previously stored.
If 'fname' is a function it will be called. 

</details>

<details>
<summary><big>time</big></summary>

### crono.start() *and* crono.stop()

The start and stop functions are useful for measuring the time interval between the execution of two arbitrary lines of code. They return a 2-dimensional array containing seconds and microseconds.Refer to the example in the 'TAG' section for a demonstration.

### date() *and* times()
simple wrappers of frequently used `Date` properties

</details>


<details>
<summary><big>TAGS</big></summary>

> use `tags` to activate or deactivate specific sets of functions or logging statements (using m.log) as explained in the following examples

```
m.tag('one').set.console()
m.tag('one').log('this will show up')

m.tag('one').unset.console()
m.tag('one').log('this won't show up')
```

and it works with  `console`, `file`, `functions`

there is also 
```
m.tag().unsetAll.file()
```

Tags works with chronometers too

```
    m.tag('uno').crono.start()
    m.log('uno', m.tag('uno').crono.stop())
```


</details>

<details>
<summary><big>tools</big></summary>

### eventify(object)

makes "object" an event emitter


### roughSize(object)

returns the approx size of an object, in bytes

### removeElement(element, array)


</details>



