<template>
    <div>

        <div>
            <h1 class="text-6xl italic text-myFour pt-10">Quiz Yourself With llama3.2</h1>
            <div class="pt-12 flex flex-col sm:flex-row items-start">
                <input type="text" v-model="topic" placeholder="Enter Topic" class="p-1 text-black rounded-xl mb-5">
                <button class ="bg-myThree p-10 rounded-xl ml-10" @click="generateQuiz">Generate Quiz</button>
            </div>
        </div>
        
        <p v-if="quizData==null">Prompting...</p>

        <div id="questionDiv" v-if="quizData">
            <div>
                {{ quizData[0].question }}
                <input>
            </div>
        </div>
        
        <div class="p-8">
            <h1 class="text-2xl pb-4 pt-10">Test your knowledge in this AI powered quiz</h1>
            <ul class="pl-4">
                <li>- Choose your own topic and generate your unique quiz</li>
                <li>- Your answers will be graded and compared to how the AI answered</li>

            </ul>
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