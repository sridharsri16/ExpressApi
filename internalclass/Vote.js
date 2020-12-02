module.exports = class Vote
{
    constructor(candidateid,name,password,challengessolved,expertlevel,
                ds,algorithm,c,java,phyton,votecount,voted,role){
        this.candidateid=candidateid
        this.name =name
        this.password =password
        this.challengessolved =challengessolved
        this.expertlevel =expertlevel
        this.ds =ds
        this.algorithm =algorithm
        this.c =c
        this.java =java
        this.phyton =phyton
        this.votecount =votecount
        this.voted =voted
        this.role =role
    }
 
};