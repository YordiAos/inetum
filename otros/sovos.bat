@echo off
echo Script ejecutado el: %date% a las %time% >> script_log.txt

cd /d D:\0appwong\0_test_examen\plantillaPlaywright\PRY_GHERKIN_02\
npx cucumber-js src/features --tags "@sovos"

echo Ejecución finalizada el: %date% a las %time% >> script_log.txt
