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

- regattaparticipant
  id:string
  sailnumber:string
  skippername:string
  crewnames:string
  clubprefix:string
  boatclass:string
  allow:boolean

- regattaevent
  participants:[regattaparticipant]
  races:[regattarace]

- regattarace
  id: string
  starttime : epochtime
  results:[raceresult]

- raceresult
  id:regattaparticipant.id
  starttime: race.starttime
  finishtime: epochtime
  finsihed:false
  ocs:flase
  dnf:false
  points:number
