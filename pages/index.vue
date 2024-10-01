<template>
    <div>
        <div>
            <h1>header</h1>
            <input type="text" v-model="topic" placeholder="Quiz Topic">
            <button @click="generateQuiz">Generate Quiz</button>
        </div>
        
        <div>
            <pre v-if="quizData">{{ quizData }}</pre>
        </div>
        
    </div>
</template>

<script>
    import { generateQuestions } from "~/components/generateQuestions.js";

    export default{
        data() {
            return {
                topic: null,
                quizData: null,
                
            };
        },
        methods: {
            generateQuiz(){
                const response = generateQuestions(this.topic).then(response => this.quizData = JSON.parse(response))
            }
        }
    }
</script>