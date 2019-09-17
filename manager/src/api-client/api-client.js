import AidDecisionClient from '@/api-client/client.ts'

const clientTest = {

}

clientTest.getList = function () {
    return AidDecisionClient.getsystradeList('')

}

export default clientTest