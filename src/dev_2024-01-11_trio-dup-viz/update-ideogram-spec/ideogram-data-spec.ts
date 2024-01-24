export default function ideogramDataSpec(
        chromosome_field : string,
        start_field : string,
        end_field : string,
){
    const spec = {
        url: 'https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG38.Human.CytoBandIdeogram.csv',
        type: 'csv',
        chromosomeField: chromosome_field ,
        genomicFields: [
            start_field , 
            end_field , 
        ],
    }
    return spec
}