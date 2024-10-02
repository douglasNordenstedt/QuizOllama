<template>
    <div>
        <div>
            <h1>Quiz With llama3.2</h1>
            <input type="text" v-model="topic" placeholder="Quiz Topic">
            <button @click="generateQuiz">Generate Quiz</button>
        </div>
        
        <p v-if="quizData==null">Prompting...</p>
        <div id="questionDiv" v-if="quizData">
            <div>
                {{ quizData[0].question }}
                <input>
            </div>
        </div>
        
    </div>
</template>

<script>
    import { generateQuestions } from "~/components/generateQuestions.js";

    export default{
        data() {
            return {
                topic: null,
                quizData: "",
                
            };
        },
        methods: {
            generateQuiz(){
                this.quizData = null;
                generateQuestions(this.topic).then(response => this.quizData = JSON.parse(response))
            }
        }
    }
</script>