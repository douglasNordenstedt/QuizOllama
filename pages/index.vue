<template>
    <div class="p-2">

        <div v-if="page==='home'">

            <div>
                <h1 class="text-6xl italic text-myFour pt-10">Quiz Yourself With llama3.2</h1>
                <div class="pt-12 flex flex-col sm:flex-row items-start">
                    <input type="text" v-model="topic" placeholder="Enter Topic" class="p-1 text-black rounded-xl mb-5">
                    <button class ="bg-myThree p-10 rounded-xl ml-10 text-2xl" @click="generateQuiz">Generate Quiz</button>
                </div>
            </div>
            
            <p v-if="quizData==null">Prompting...</p>

            <div id="questionDiv" v-if="quizData">
                <div>
                    {{ quizData[0].question }}
                    <input>
                </div>
            </div>
            
            <div class="p-8 mt-10 bg-myTwo rounded-2xl">
                <h1 class="text-3xl mb-4">Test your knowledge in this AI powered quiz</h1>
                <ul class="pl-4">
                    <li>- Choose your own topic and generate a unique quiz</li>
                    <li>- Your answers will be graded and compared to how the AI answered</li>

                </ul>
            </div>
        </div>

        <div v-if="page==='loading'" class="flex justify-center items-center">
            <icon name="svg-spinners:blocks-shuffle-3" style="color: #00ADB5" size="60px"/>
        </div>



    </div>
</template>

<script>

    import { generateQuestions } from "~/components/generateQuestions.js";

    export default{
        data() {
            return {
                page: "home",
                topic: null,
                quizData: "",
                
            };
        },
        methods: {
            generateQuiz(){
                this.quizData = null;
                this.page="loading";
                generateQuestions(this.topic).then(response => this.quizData = JSON.parse(response))
            }
        }
    }
</script>