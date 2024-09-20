export async function DateTimeNow() {
    const nDate = new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo'
    });         

	return nDate;
}

export default DateTimeNow;  