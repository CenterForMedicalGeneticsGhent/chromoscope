$(document).ready(function () {
    $('#searchForm').on('submit', function (event) {
        event.preventDefault();
        $('#loading').show();

        $.ajax({
            url: '/search',
            method: 'POST',
            data: $(this).serialize(),
            success: function (response) {
                $('#loading').hide();

                if (response.error) {
                    $('#results').html('<p>' + response.error + '</p>');
                } else {
                    $('#resultsHeader').show();
                    $('#resultsSummary').show();
                    $('#resultsTable').html(response.data);
                    $('#resultsSummary').text('Found ' + response.entries + ' entries in ' + response.timing + ' seconds.');
                    $('#processSelected').show();
                }
            },
            error: function (error) {
                $('#loading').hide();
                alert('An error occurred: ' + error.responseText);
            }
        });
    });

    $('#processSelected').on('click', function () {
        var selectedFiles = [];
        $('.result-checkbox:checked').each(function () {
            selectedFiles.push({ key: $(this).data('key'), url: $(this).data('url') });
        });

        if (selectedFiles.length > 0) {
            $('#formContainer').show();
            populateDropdowns(selectedFiles);
        } else {
            alert('Please select at least one file.');
        }
    });

    $('#configForm').on('submit', function (event) {
        $('#loading').show();
        event.preventDefault();
        var formData = $(this).serializeArray();
        var data = {};
        formData.forEach(function (field) {
            data[field.name] = field.value;
        });

        // Get the file name from the selected option in each dropdown
        var vcf = $('#vcf option:selected').text();
        var vcfIndex = $('#vcfIndex option:selected').text();
        var baf = $('#baf option:selected').text();
        var cnv = $('#cnv option:selected').text();
        var me = $('#me option:selected').text();
        var me2 = $('#me2 option:selected').text();
        var pm = $('#pm option:selected').text();
        var haplo = $('#haplo option:selected').text();
        var roi = $('#roi option:selected').text();
        var binStats = $('#binStats option:selected').text();
        var summary = $('#summary option:selected').text();

        // Set the full file URL in the data object
        data['vcf'] = $('#vcf').val();
        data['vcfIndex'] = $('#vcfIndex').val();
        data['baf'] = $('#baf').val();
        data['cnv'] = $('#cnv').val();
        data['me'] = $('#me').val();
        data['me2'] = $('#me2').val();
        data['pm'] = $('#pm').val();
        data['haplo'] = $('#haplo').val();
        data['roi'] = $('#roi').val();
        data['binStats'] = $('#binStats').val();
        data['summary'] = $('#summary').val();


        $.ajax({
            url: '/generate_config',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                $('#loading').hide();
                var blob = new Blob([response.config], { type: "application/json" });
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = "config.json";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            },
            error: function (error) {
                $('#loading').hide();
                alert('An error occurred: ' + error.responseText);
            }
        });
    });

    $('#visualizeBtn').on('click', function (event) {
        event.preventDefault();
        $('#loading').show();

        var formData = $('#configForm').serializeArray();
        var data = {};
        formData.forEach(function (field) {
            data[field.name] = field.value;
        });
        console.log(data)
        // Get the file name from the selected option in each dropdown
        var vcf = $('#vcf option:selected').text();
        var vcfIndex = $('#vcfIndex option:selected').text();
        var baf = $('#baf option:selected').text();
        var cnv = $('#cnv option:selected').text();
        var me = $('#me option:selected').text();
        var me2 = $('#me2 option:selected').text();
        var pm = $('#pm option:selected').text();
        var haplo = $('#haplo option:selected').text();
        var roi = $('#roi option:selected').text();
        var binStats = $('#binStats option:selected').text();
        var summary = $('#summary option:selected').text();

        // Set the file name in the data object
        data['vcf'] = vcf;
        data['vcfIndex'] = vcfIndex;
        data['baf'] = baf;
        data['cnv'] = cnv;
        data['me'] = me;
        data['me2'] = me2;
        data['pm'] = pm;
        data['haplo'] = haplo;
        data['roi'] = roi;
        data['binStats'] = binStats;
        data['summary'] = summary;

        $.ajax({
            url: '/visualize_chromoscope',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                $('#loading').hide();
                if (response.chromoscope_url) {
                    window.open(response.chromoscope_url, '_blank');
                } else {
                    alert('Failed to visualize in Chromoscope.');
                }
            },
            error: function (error) {
                $('#loading').hide();
                alert('Error occurred while visualizing in Chromoscope.');
            }
        });
    });


    function populateDropdowns(files) {
        // Clear all existing dropdowns before appending new options
        $('#vcf, #vcfIndex, #baf, #cnv, #me, #me2, #pm, #haplo, #roi, #binStats, #summary').html('<option value=""></option>');

        files.forEach(function (file) {
            var fileUrl = file.key
            var fileName = file.key.split('/').pop().split('?')[0];
            var option = '<option value="' + fileUrl + '">' + fileName + '</option>';

            // Populate the vcf dropdown with files containing '.vcf'
            if (fileName.includes('.vcf') && !fileName.includes('.tbi')) {
                $('#vcf').append(option);
            }

            // Populate the vcfIndex dropdown with files containing '.tbi'
            if (fileName.includes('.tbi')) {
                $('#vcfIndex').append(option);
            }

            // Populate the baf dropdown with files containing 'BAF'
            if (fileName.toLowerCase().includes('baf')) {
                $('#baf').append(option);
            }

            // Populate the cnv dropdown with files containing 'cnv'
            if (fileName.toLowerCase().includes('cnv')) {
                $('#cnv').append(option);
            }

            // Populate the me dropdown with files containing 'man_error'
            if (fileName.toLowerCase().includes('man_error')) {
                $('#me').append(option);
            }

            // Populate the me2 dropdown with files containing 'windowed_errors'
            if (fileName.toLowerCase().includes('windowed_errors')) {
                $('#me2').append(option);
            }

            // Populate the pm dropdown with files containing 'pm_tracks'
            if (fileName.toLowerCase().includes('pm_tracks')) {
                $('#pm').append(option);
            }

            // Populate the haplo dropdown with files containing 'haplo'
            if (fileName.toLowerCase().includes('haplo')) {
                $('#haplo').append(option);
            }

            // Populate the roi dropdown with files containing 'regions'
            if (fileName.toLowerCase().includes('regions')) {
                $('#roi').append(option);
            }

            // Populate the binStats dropdown with files containing 'variant_bins'
            if (fileName.toLowerCase().includes('variant_bins')) {
                $('#binStats').append(option);
            }

            // Populate the summary dropdown with files containing 'vcf_'
            if (fileName.toLowerCase().includes('vcf_')) {
                $('#summary').append(option);
            }
        });
    }

});

