import Icon from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import {
	Button,
	Descriptions,
	DescriptionsProps,
	Divider,
	Typography
} from 'antd'
import session from 'api/sys/session'
import { TableData } from 'app_models/search'
import InformationSvg from 'assets/icons/Information.svg?react'
import { getQuery } from 'assets/js/publicFunc'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import Structure from './components/Structure'
import { Table } from 'antd/lib'
import './index.less'
export interface peptidedata {
	peptideid: string
	peptideSequence: string
	PEI: string
	pdb: string
}
const ResultPage = () => {
	const [t] = useTranslation()
	const location = useLocation()
	const initialpdbdata = location.state?.tableData
	// const initialPdbData = location.state?.tableData
	// const [pdbdata, setPdbdata] = useState(initialPdbData)
	const [pdbdata, setpdbdata] = useState<TableData | null>(initialpdbdata)

	console.log('resultpage_pdbdata', pdbdata)
	const peptides = location.state?.peptidedata
	// console.log('resultpage_peptides', peptides)
	const query = getQuery()
	const fetchScreenData = useCallback(async () => {
		if (!query.id) return undefined
		const data: any = await session.search({ id: query.id })
		return data || undefined
	}, [query])
	const handleViewStructure = (pdb: string, id: string, pei: number) => {
		window.scrollBy({
			// top: -window.innerHeight * 0.4,
			top: window.innerHeight * 1.1,
			behavior: 'smooth'
		})
		const tableData: TableData = {
			id: id, // 根据实际情况填充
			sequence: 'proteinSequence' || '', // 根据实际情况填充
			length: pei,
			neuropeptide: pdb
		}
		console.log('pdb:', tableData)
		setpdbdata(tableData)
	}
	const { isLoading, data } = useQuery<TableData>({
		queryKey: ['searchId', query],
		queryFn: fetchScreenData
	})
	const { isLoading: isPeptideLoading, data: peptidedata } = useQuery<Peptide>({
		queryKey: ['searchId', query],
		queryFn: fetchScreenData
	})

	const exportImage = (uri: string, t: string) => {
		const a = document.createElement('a')
		a.href = uri
		a.download = `${query.id}_${t}.png`
		a.click()
	}

	if (isLoading) {
		return <div>loading...</div>
	}
	if (isPeptideLoading) {
		return <div>loading...</div>
	}

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id'
		},
		{
			title: 'Sequence',
			dataIndex: 'sequence',
			key: 'sequence',
			width: 400,
			ellipsis: true
		},
		{
			title: 'PEI',
			dataIndex: 'pei',
			key: 'PEI',
			filters: [
				{ text: 'High', value: 'high' },
				{ text: 'Medium', value: 'medium' },
				{ text: 'Low', value: 'low' }
				// { text: 'From High to Low', value: 'fromHighToLow' }
			],
			onFilter: (value: string, record: { pei: number }) => {
				if (value === 'high') {
					return record.pei > 7 // 假设大于7为High
				} else if (value === 'medium') {
					return record.pei > 4 && record.pei <= 7 // 假设4到7为Medium
				} else if (value === 'low') {
					return record.pei <= 4 // 假设小于等于4为Low
				} else if (value === 'fromHighToLow') {
					return true // 这个选项不进行过滤，只是用于排序
				}
				return false
			},
			sorter: (a: { pei: number }, b: { pei: number }) => b.pei - a.pei // 添加排序功能
		},
		{
			title: '3D Structure',
			key: 'pdb',
			dataIndex: 'pdb',
			render: (text: any, record: { pdb: string; id: string; pei: number }) => (
				<Button
					onClick={() => handleViewStructure(record.pdb, record.id, record.pei)}
				>
					View 3D Structure
				</Button>
			)
		}
	]
	return (
		<div className='result-page py-[20px]'>
			<div className='content'>
				{/* <div>
					<Table
						columns={columns}
						dataSource={peptides}
						rowKey={item => item.id}
						className='mt-[20px]'
					/>
				</div> */}
				{peptides && peptides.length > 0 && (
					<Table
						columns={columns}
						dataSource={peptides}
						rowKey={item => item.id}
						className='mt-[20px]'
					/>
				)}

				<Typography.Title level={5} className='header'>
					3D Structure
				</Typography.Title>
				<div className='content-wrapper'>
					<Divider className='my-[12px]' />
					<p>
						Structure&nbsp;
						<Icon component={InformationSvg}></Icon>
					</p>
					<Structure data={pdbdata} handleExport={exportImage} />
				</div>
			</div>
		</div>
	)
}

export default ResultPage
