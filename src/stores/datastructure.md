- participant

  - sailnumber
  - skippername
  - crewnames
  - clubprefix
  - boatclass
  - allow

- participants[] (Abstract)

- course (Abstract)

  - anchorlocation
  - rotation
  - scale
  - type
  - laps
  - route

- race

  - id
  - starttime
  - timersequence
    -> raceCourse : course
    -> raceParticipants : participants

- regatta

  - id
  - title
  - description
  - location
  - DateTime
  - earlieststart
  - lateststart
    -> regattaCourse : course
    -> regattaParticipants : participants

- result : particpant
  - position
  - points
  - finishtime
